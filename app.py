from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow requests from the frontend to the backend
CORS(app, resources={r"/*": {"origins": "*"}})

# Set your OpenAI API key (Meant to be kept hidden)
openai.api_key = ""
@app.route('/process-scores', methods=['POST'])
def process_scores():
    try:
        # Step 1: Receive the data sent from the frontend
        data = request.get_json()
        print("Received data:", data)  # Log the data for debugging

        # Step 2: Extract the total score from the received data
        total_score = data.get('total_score', 0)
        if total_score == 0:
            print("Error: Invalid score received")  # Debugging log
            return jsonify({"error": "Invalid score"}), 400  # Return error response if score is invalid

        # Step 3: Create a prompt for OpenAI to generate feedback
        prompt = f"User scored {total_score}. Provide feedback on ambition, networking, and popularity."
        print("Generated prompt:", prompt)  # Log the prompt for debugging

        # Step 4: Call OpenAI's API to generate feedback
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Specify the OpenAI model
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        print("OpenAI response:", response)  # Log the response for debugging

        # Step 5: Extract the generated feedback from the OpenAI response
        feedback = response['choices'][0]['message']['content'].strip()

        # Step 6: Return the feedback and score as a JSON response
        return jsonify({
            "total_score": total_score,
            "feedback": feedback
        })

    except Exception as e:
        # Handle any exceptions and log the error for debugging
        print("Error occurred:", str(e))
        return jsonify({"error": str(e)}), 500

# Run the Flask app in debug mode (only for development purposes)
if __name__ == '__main__':
    app.run(debug=True)

