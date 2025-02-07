from flask import Flask, render_template, request, jsonify
import json
import re
import os

app = Flask(__name__)

current_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(current_dir, 'questions.json')


try:
    with open(json_path) as f:
        data = json.load(f)
        questions_data = data['questions']
        print(f"Nombre de questions chargées : {len(questions_data)}")  # Debug
except Exception as e:
    print(f"Erreur lors du chargement du JSON : {e}")
    questions_data = []  # Éviter les crashs ultérieurs

def find_answer(user_question):
    user_question = user_question.lower().strip()
    user_question = re.sub(r'[^\w\s]', '', user_question)
    user_words = set(user_question.split())

    best_match = None
    max_score = 0

    for item in questions_data:
        question = item['question'].lower().strip()
        question_clean = re.sub(r'[^\w\s]', '', question)
        question_words = set(question_clean.split())

        # Score basé sur le nombre de mots communs
        common_words = user_words.intersection(question_words)
        score = len(common_words)

        if score > max_score:
            max_score = score
            best_match = item['answer']

    return best_match if best_match else "Désolé, je n'ai pas compris votre question."

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()  # Récupérer les données JSON envoyées par le frontend
    user_question = data.get('question')  # Accéder à la question
    answer = find_answer(user_question)  # Chercher la réponse
    return jsonify({'answer': answer})  # Retourner la réponse en JSON

if __name__ == '__main__':
    app.run(debug=True)
