
# The functionality for all the endpoints that we create is defined inside "views.py"

from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer, UserSerializer
from django.contrib.auth.models import User
from .aws_utils import upload_file_to_s3, list_files_in_s3, generate_presigned_url, delete_file_from_s3  
# these are necessary packages for AWS integration

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        }, status=status.HTTP_201_CREATED)

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

# Example Protected View (to test tokens)
class TestProtectedAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class FileUploadAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES['file']
        filename = f"{request.user.username}/{file_obj.name}"  # Keep user files organized
        url = upload_file_to_s3(file_obj, filename)
        return Response({"file_url": url}, status=status.HTTP_201_CREATED)

# List Files API
class FileListAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        files = list_files_in_s3()
        user_files = [f for f in files if f.startswith(request.user.username)]
        return Response({"files": user_files})

# Download API (generate pre-signed URL)
class FileDownloadAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, filename, *args, **kwargs):
        presigned_url = generate_presigned_url(f"{request.user.username}/{filename}")
        return Response({"download_url": presigned_url})

# Delete API
class FileDeleteAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, filename, *args, **kwargs):
        delete_file_from_s3(f"{request.user.username}/{filename}")
        return Response({"message": "File deleted successfully"}, status=status.HTTP_204_NO_CONTENT)