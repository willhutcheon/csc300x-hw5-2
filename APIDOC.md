# *jokebook* API Documentation
## Endpoint 1 - /jokebook/categories
**Request Format:**
**None**
**Request Type:**
**GET**
**Returned Data Format**:
**JSON**
**Description:**
**Example Request:**
**GET http://localhost:3000/jokebook/categories**
**Example Response:**
**[**
    **"funnyJoke",**
    **"lameJoke"**
**]**
**Error Handling:**
**If the request cannot be sucessfully processed a 500 internal server error will be returned**

## Endpoint 2 - /jokebook/joke/:category
**Request Format:**
**GET request with the category parameter in the URL path. Optionally, a query parameter (limit) can be included to limit the number of jokes returned.**
**Request Type:**
**GET**
**Returned Data Format**:
**JSON**
**Description:**
**This endpoint allows users to view the jokes corresponding to a particular category**
**Example Request:**
**GET http://localhost:3000/jokebook/joke/funnyJoke**
**Example Response:**
**[**
    **{**
        **"joke": "Why did the student eat his homework?",**
        **"response": "Because the teacher told him it was a piece of cake!"**
    **},**
    **{**
        **"joke": "What kind of tree fits in your hand?",**
        **"response": "A palm tree"**
    **},**
    **{**
        **"joke": "What is worse than raining cats and dogs?",**
        **"response": "Hailing taxis"**
    **}**
**]**
**Error Handling:**
**Valid category: If the category is not valid or not included in the list, it returns a 400 Bad Request status with an error message indicating that the category is invalid.**
**Query Parameter Validation: The endpoint also accepts an optional limit query parameter. If provided, it is parsed into an integer using parseInt(req.query.limit). If the limit parameter is provided and valid, the jokes array for the specified category is sliced to the specified limit.**
**Response Handling: If the category exists and is valid, and if the limit (if provided) is within bounds, the endpoint responds with a JSON array containing jokes for that category. If the category does not exist in the predefined categories array, the endpoint responds with a 400 status code and a JSON object containing an error message indicating that the category is not listed.**

## Endpoint 3 - /jokebook/joke/new
**Request Format:**
**POST request with JSON data in the request body containing 'category', 'joke', and 'response'.**
**Request Type:**
**POST**
**Returned Data Format**:
**JSON**
**Description:**
**This endpoint allows users to post new jokes**
**Example Request:**
**{**
    **"category": "funnyJoke",**
    **"joke": "Why don't scientists trust atoms?",**
    **"response": "Because they make up everything!"**
**}**
**Example Response:**
**{**
    **"message": "New joke added successfully!",**
    **"joke": {**
        **"category": "funnyJoke",**
        **"joke": "Why don't scientists trust atoms?",**
        **"response": "Because they make up everything!"**
    **}**
**}**
**Error Handling:**
**Checking for required parameters: If any of the required parameters are missing a 400 Bad Request status along with a JSON object containing an error message indicating that the input is invalid or insufficient will be returned.**
**Valid categoty: If the category is not valid or not included in the list, it returns a 400 Bad Request status with an error message indicating that the category is invalid.**
**Joke sucessfully added: If the input is valid and the joke is successfully added to the array of jokes for the specified category, a JSON object containing the updated array of jokes for the category will be displayed.**