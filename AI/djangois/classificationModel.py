from django.http import JsonResponse

from tensorflow import keras
from django.views.decorators.csrf import csrf_exempt
import json
import h5py

@csrf_exempt
def classification(request):
    # Load the saved model
    # model = keras.models.load_model('cer01.h5')
    with h5py.File('cer01.h5', 'r') as f:
        model = keras.models.load_model(f)
    # print('-------------------------------------------------pass 01')

    # Load the saved tokenizer configuration from the JSON file
    with open('tokenizer_config.json', 'r') as f:
        tokenizer_config_json = f.read()

    # Create a new tokenizer with the saved configuration
    tokenizer = keras.preprocessing.text.tokenizer_from_json(tokenizer_config_json)

    # Get the input string from the REST API request
    data = json.loads(request.body)
    input_string = data.get('msg')

    print(input_string)

    # Convert the input string to a sequence of integer indices
    input_sequence = tokenizer.texts_to_sequences([input_string])

    # Pad the input sequence to the maximum sequence length used during training
    max_sequence_length = 189
    padded_input = keras.preprocessing.sequence.pad_sequences(input_sequence, maxlen=max_sequence_length)

    # Use the model to make a prediction on the preprocessed input
    prediction = model.predict(padded_input)[0][0]

    # Return the prediction as a REST API response
    # return JsonResponse({'prediction': 1 if prediction > 0.5 else 0})
    prediction = 1 if prediction > 0.5 else 0
    response = JsonResponse({'prediction': prediction})
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response['Access-Control-Allow-Headers'] = 'X-Requested-With, content-type, Authorization'

    return response