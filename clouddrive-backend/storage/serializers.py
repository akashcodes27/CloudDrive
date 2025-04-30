from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CustomTokenObtainPairSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        from django.contrib.auth import authenticate
        user = authenticate(username=attrs['username'], password=attrs['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        else:
            raise serializers.ValidationError('Invalid credentials')





'''

Inside serializer.py:

"serializers": 
We import "serializer" which is a core module of the "rest_framework" package of django 

-> from rest_framework import serializers

"User":
It is Django's built-in user model. It is like an object handler which allows us to deal with specific users. 

-> from user.contrib.auth.models import User


"RefreshToken"
JWT token generator in django 

The primary purpose of a serializer is to handle interactions of Django data objects with the API requests. 
In serializer.py, we have defined different serializers for various different purposes. 

UserSerializer: controls and regulates the "GET" API request, decides what data should be exposed to the endpoint and what should not.
 
RegisterSerializer: controls and regulates "POST" API request, it takes details from user( id, name, email, password) and makes use of "create_user" to create a user and store its details in django database. 

CustomTokenObtainPairSerializer: used for login and also generates JWT tokens for authenticated users. uses "authenticate" function. Two types of tokens generated: access_tokens and refresh_tokens   

Whenever we take/retrieve "password" from any API endpoint request, we always mention "write_only=true". ensuring that we can never read passwords. 




'''