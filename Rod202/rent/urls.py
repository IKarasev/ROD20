from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.sellpage, name='sellpage'),
    url(r'^test/', views.testpage, name='testpage'),
    url(r'^getdata/roomsdata/', views.getRoomsList, name='getRoomsList'),
]