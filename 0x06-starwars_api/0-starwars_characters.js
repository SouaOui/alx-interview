#!/usr/bin/python3
import requests
import json
import sys


def get_and_print_character_names(film_id):
    """Fetches character names from the Star Wars API for a given film ID.

    Args:
        film_id (int): The ID of the film to retrieve characters from.

    Prints the names of all characters associated with the film.

    Raises:
        requests.exceptions.RequestException:
                If an error occurs during the API request.
    """

    url = f"https://swapi-api.alx-tools.com/api/films/{film_id}"

    try:
        response = requests.get(url)
        response.raise_for_status()

        data = json.loads(response.text)
        character_urls = data["characters"]

        for character_url in character_urls:
            response = requests.get(character_url)
            response.raise_for_status()

            character_data = json.loads(response.text)
            print(character_data["name"])

    except requests.exceptions.RequestException as e:
        print(f"An error occurred fetching character names: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: script.py <film_id>")
        exit(1)

    film_id = int(sys.argv[1])
    get_and_print_character_names(film_id)
