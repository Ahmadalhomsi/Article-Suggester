# import spacy
import os
import sys
sys.path.append('./app/api/')
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from string import punctuation
from datasets import load_dataset
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from transformers import AutoModel, AutoTokenizer
from torch import nn
from torch.optim import Adam
import torch
from typing import List
from joblib import Parallel, delayed
import math


# Load the dataset
dataset = load_dataset("memray/krapivin")


def getDataset():
    # ['name', 'title', 'abstract', 'fulltext', 'keywords']

    recommendationsJson = [{"name": dataset['validation']['name'],
                            'title': dataset['validation']['title'],
                            'abstract': dataset['validation']['abstract'],
                            # 'fulltext': dataset['validation']['fulltext'][:5],
                            'keywords': dataset['validation']['keywords'],

                            }]
    print(recommendationsJson)
    return recommendationsJson


def algorithm(user_interests, datasetCount, model_choice, model_path='/fastText'):
    # Download necessary resources from NLTK
    print("Model Choice: " )
    print(model_choice)

    nltk.download('punkt')
    nltk.download('stopwords')

    # Function to preprocess text
    def preprocess_text(text):
        # Lowercase the text
        text_lower = text.lower()

        # Remove punctuation
        no_punct = "".join(
            [char for char in text_lower if char not in punctuation])

        # Remove stop words
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in word_tokenize(
            no_punct) if word not in stop_words]

        # Join tokens back into a string
        preprocessed_text = ' '.join(tokens)

        return preprocessed_text

    # Load models based on user choice
    if model_choice == 1:  # SciBERT
        # Load SciBERT model and tokenizer
        model = AutoModel.from_pretrained("allenai/scibert_scivocab_uncased")
        tokenizer = AutoTokenizer.from_pretrained(
            "allenai/scibert_scivocab_uncased")

        def encode_text(text):
            encoded = tokenizer(text, return_tensors='pt')
            with torch.no_grad():
                output = model(**encoded)
            return output.last_hidden_state.mean(dim=1).squeeze()

    elif model_choice == 2:  # FastText
        import fasttext
        ft_model = fasttext.load_model(
            os.path.join('cc.en.300.bin'))

        def encode_text(text):
            words = text.split()
            vectors = [ft_model.get_word_vector(
                word) for word in words if word in ft_model]
            if vectors:
                return torch.tensor(np.mean(vectors, axis=0))
            else:
                return torch.zeros(ft_model.get_dimension())

    # Preprocess user interests
    preprocessed_user_interests = preprocess_text(user_interests)

    # Encode user interests
    user_interests_vector = encode_text(preprocessed_user_interests)

    # Set the batch size
    batch_size = 32

    # Calculate total number of datasets
    total_datasets = len(dataset['validation']['abstract'][:datasetCount])

    # Calculate total number of batches
    total_batches = math.ceil(total_datasets / batch_size)

    # Initialize recommendations list
    recommendations = []

    # Process datasets in batches
    for batch_index in range(total_batches):
        # Calculate the start and end index for the current batch
        start_index = batch_index * batch_size
        end_index = min((batch_index + 1) * batch_size, total_datasets)

        # Process the current batch
        for i in range(start_index, end_index):
            abstract = dataset['validation']['abstract'][i]
            preprocessed_abstract = preprocess_text(abstract)
            abstract_vector = encode_text(preprocessed_abstract)

            # Calculate cosine similarity between user interests vector and abstract vector
            similarity = cosine_similarity(user_interests_vector.reshape(
                1, -1), abstract_vector.reshape(1, -1))[0][0]

            # Store the recommendation along with its similarity score
            recommendations.append((abstract, similarity))

        # Print progress after processing each batch
        print(f"Batch {batch_index + 1}/{total_batches} processed")

    print("All batches processed")

    # Sort recommendations based on similarity score in descending order
    recommendations.sort(key=lambda x: x[1], reverse=True)

    recommendationsJson = []
    # Print recommended articles along with similarity scores
    print("Recommended Articles:")
    for recommendation in recommendations:
        print("Similarity Score:", recommendation[1])
        print("Abstract:", recommendation[0])
        print("--------------------------+++")
        # Convert to float if necessary
        similarity_score = float(recommendation[1])
        recommendationsJson.append(
            {"abstract": recommendation[0], "similarity_score": similarity_score})

    return recommendationsJson