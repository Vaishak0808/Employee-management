from django.urls import path, include
from .views import CustomFormAPIView,SaveFormDetails

urlpatterns = [
    path('customeform/', CustomFormAPIView.as_view(),name='customeform'),
    path('saveformdetails/', SaveFormDetails.as_view(),name='saveformdetails'),
    
    
    

]