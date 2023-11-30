
from ImageApp import views
from django.urls import  re_path as url

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^SaveFile$', views.SaveFile)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.OUTPUT_URL, document_root=settings.OUTPUT_ROOT)