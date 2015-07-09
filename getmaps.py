#! -*- coding: utf-8 -*-
from googleplaces import GooglePlaces, types, lang

YOUR_API_KEY = 'AIzaSyCytAf2M7q97Km5tWSGcEeQ-_-jyxrBrfc'

google_places = GooglePlaces(YOUR_API_KEY)

# You may prefer to use the text_search API, instead.
query_result = google_places.nearby_search(
        location='Rio de Janeiro',
        radius=50000, types=[types.TYPE_DOCTOR,
        types.TYPE_EMBASSY,
        types.TYPE_HEALTH,
        types.TYPE_HOSPITAL,
        types.TYPE_PHARMACY,
        types.TYPE_POLICE])

if query_result.has_attributions:
    print query_result.html_attributions


for place in query_result.places:
    # Returned places from a query are place summaries.
    # print place.name

    # print place.place_id

    # The following method has to make a further API call.
    place.get_details()
    # Referencing any of the attributes below, prior to making a call to
    # get_details() will raise a googleplaces.GooglePlacesAttributeError.
    try:
        the_place = "['%s', '%s', %s, '%s']" % (place.name,
            place.details['formatted_address'],
            place.geo_location,
            place.details['icon'],
        )
        print the_place
    except:
        pass
    # print place.international_phone_number
    # print place.website
    # print place.url
