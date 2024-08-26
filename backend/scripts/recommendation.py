import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Sample data
users = pd.DataFrame({
    'userId': ['user1', 'user2'],
    'preferences': ['action comedy', 'action drama']
})

videos = pd.DataFrame({
    'videoId': ['video1', 'video2', 'video3'],
    'title': ['Action Movie', 'Comedy Movie', 'Drama Movie'],
    'genre': ['action', 'comedy', 'drama']
})

# Create a TF-IDF Vectorizer
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(videos['genre'])

# Compute similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def get_recommendations(user_id):
    # Get user preferences
    user_preferences = users[users['userId'] == user_id]['preferences'].values[0]
    
    # Find matching videos based on genre
    user_vector = vectorizer.transform([user_preferences])
    user_similarity = cosine_similarity(user_vector, tfidf_matrix)
    
    # Get video recommendations
    similar_indices = user_similarity[0].argsort()[::-1]
    recommended_videos = videos.iloc[similar_indices]
    
    return recommended_videos

# Example usage
recommended_videos = get_recommendations('user1')
print(recommended_videos)
