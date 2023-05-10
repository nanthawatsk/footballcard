from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from .forms import createUserForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer

# Create your views here.

def index(request):
    return render(request, 'index.html')

def registerPage(request):
    form = createUserForm()
    if request.method == "POST":
        form = createUserForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get("username")
            messages.success(request, "Account was created for " + user)
            return redirect("login")
    context = {"form":form}
    return render(request, "signup.html", context)
        
   
def loginPage(request):
    if request.method == "POST":
        form = AuthenticationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None :
                login(request, username)
                messages.info(request, f"You are now logged in as {username}")
                return redirect("index")
            else:
                messages.error(request, "Invalid username or password")
        else:
            messages.error(request, "Invalid username or password")

    form = AuthenticationForm()
    context = {}
    return render(request, "login.html", context)

def logoutUser(request):
    logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("login")

class SignUpView(generic.CreateView):
    form_class = createUserForm
    success_url = reverse_lazy("login")
    template_name = "signup.html"

# class SignUpView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "User created successfully"}, status=201)
#         return Response(serializer.errors, status=400)
    
#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response(serializer.data)
    
#     def put(self, request):
#         serializer = UserSerializer(request.user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "User updated successfully"}, status=200)
#         return Response(serializer.errors, status=400)
    
#     def delete(self, request):
#         request.user.delete()
#         return Response({"message": "User deleted successfully"}, status=200)
    
# class LoginView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "User created successfully"}, status=201)
#         return Response(serializer.errors, status=400)
    
#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response(serializer.data)
    
#     def put(self, request):
#         serializer = UserSerializer(request.user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "User updated successfully"}, status=200)
#         return Response(serializer.errors, status=400)
    
#     def delete(self, request):
#         request.user.delete()
#         return Response({"message": "User deleted successfully"}, status=200)
