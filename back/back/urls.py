from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('gitpy.urls')),
    path('', include_docs_urls(title='API GitFlat'))
]
