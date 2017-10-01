from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

import ml
from ml_web.model import Storage, User

def test(request):
    animal = ml.run()
    print(animal)
    return HttpResponse(animal)

def test2(request):
    # t = tuple()
    t = Storage.objects.get(id = 1)
    print(t.name)
    # Storage.objects.get(pk = 1)
    # st = storage(image = '123')
    # st.save()
    return HttpResponse(1)