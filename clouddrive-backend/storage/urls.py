from django.urls import path
from .views import RegisterAPI, LoginAPI, TestProtectedAPI
from .views import FileDeleteAPI, FileDownloadAPI, FileListAPI, FileUploadAPI

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('me/', TestProtectedAPI.as_view(), name='user-profile'),
    path('upload/', FileUploadAPI.as_view(), name='file-upload'),
    path('files/', FileListAPI.as_view(), name='file-list'),
    path('files/<str:filename>/download/', FileDownloadAPI.as_view(), name='file-download'),
    path('files/<str:filename>/delete/', FileDeleteAPI.as_view(), name='file-delete'),
]
