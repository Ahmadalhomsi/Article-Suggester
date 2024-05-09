import spacy
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


# Load the dataset
dataset = load_dataset("memray/krapivin")


def getDataset():
    # ['name', 'title', 'abstract', 'fulltext', 'keywords']
    
    recommendationsJson = [{"name": dataset['validation']['name'],
                            'title': dataset['validation']['title'],
                            'abstract': dataset['validation']['abstract'],
                            #'fulltext': dataset['validation']['fulltext'][:5],
                            'keywords': dataset['validation']['keywords'],

                            }]
    print(recommendationsJson)
    return recommendationsJson


def algorithm(user_interests, datasetCount):

    # Download necessary resources from NLTK
    nltk.download('punkt')
    nltk.download('stopwords')

    # Load the spaCy model with word vectors
    nlp = spacy.load("en_core_web_sm")

    # Load SciBERT model and tokenizer
    model = AutoModel.from_pretrained("allenai/scibert_scivocab_uncased")
    tokenizer = AutoTokenizer.from_pretrained(
        "allenai/scibert_scivocab_uncased")

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

    # Define user interests as a string
    preprocessed_user_interests = preprocess_text(user_interests)

    # Tokenize and encode user interests using SciBERT tokenizer
    encoded_user_interests = tokenizer(
        preprocessed_user_interests, return_tensors='pt')
    
    print("Here1")

    # Process the user's interests using SciBERT model
    with torch.no_grad():
        user_interests_output = model(**encoded_user_interests)

    # Extract the output embeddings for user interests
    user_interests_vector = user_interests_output.last_hidden_state.mean(
        dim=1).squeeze()

    # Calculate cosine similarity between user interests vector and article vectors
    recommendations = []
    # Considering the first 4 abstracts for demonstration
    for abstract in dataset['validation']['abstract'][:datasetCount]:
        preprocessed_abstract = preprocess_text(abstract)
        encoded_abstract = tokenizer(
            preprocessed_abstract, return_tensors='pt')

        # Process the abstract using SciBERT model
        with torch.no_grad():
            abstract_output = model(**encoded_abstract)

        # Extract the output embeddings for the abstract
        abstract_vector = abstract_output.last_hidden_state.mean(
            dim=1).squeeze()

        # Calculate cosine similarity between user interests vector and abstract vector
        similarity = cosine_similarity(user_interests_vector.reshape(
            1, -1), abstract_vector.reshape(1, -1))[0][0]

        # Store the recommendation along with its similarity score
        recommendations.append((abstract, similarity))

    print("Here2")


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
