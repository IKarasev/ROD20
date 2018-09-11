from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.core import serializers
import json

from .models import Rooms
from .models import Contacts
from .forms import ApplicationForm

# Create your views here.
def sellpage(request):
	rooms = Rooms.objects.filter(occupied = False);
	contacts = Contacts.objects.all()[0];
	context = {
		'free_rooms': rooms,
		'contacts': contacts,
		'form': ApplicationForm,
	}
	return render(request, 'general/salepage.html', context)

def testpage(request):
	return render(request, 'general/test.html',)


def getRoomsList(request):
	"""Returns the JSON of room numbers and corresponding occupied field"""
	rooms = json.loads(serializers.serialize("json", Rooms.objects.all(), fields=('occupied','floor')))
	return JsonResponse(rooms, safe=False)