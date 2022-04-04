from geopy.exc import GeocoderTimedOut
from geopy.geocoders import Nominatim

def findLocation(lat, lng):
    
    # initialize Nominatim API
    try:
        geolocator = Nominatim(user_agent="dispersion-app")
    except GeocoderTimedOut:
        return findLocation(lat, lng)

    location = geolocator.reverse(str(lat) + "," + str(lng))

    address = location.raw['address']
    # print(address)

    country = address.get('country', '')
    city = address.get('city', '')

    if (country != '' and city != ''):
        exactLocation = geolocator.geocode(city)
        if exactLocation != None:
            return {'location': country + ', ' + city, 'lat': exactLocation.latitude, 'lng': exactLocation.longitude}
        else:
            return None
    else:
        return None

def findCity(city):

    # initialize Nominatim API
    try:
        geolocator = Nominatim(user_agent="dispersion-app")
    except GeocoderTimedOut:
        return findCity(city)

    location = geolocator.geocode(city)

    if location != None:
        address =  geolocator.reverse(str(location.latitude) + "," + str(location.longitude)).raw['address']
        country = address.get('country', '')
        city = address.get('city', '')
        if (country != '' and city != ''):
            return {'location': country + ', ' + city, 'lat': location.latitude, 'lng': location.longitude}
        else:
            return None
    else:
        return None