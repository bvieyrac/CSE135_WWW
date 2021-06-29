from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

# Create your views here.
def logout(request):
            auth.logout(request)
            return render(request, "authentication/logout.html", {})

def login(request):
            if request.method == 'POST':
                        username = request.POST['username']
                        password = request.POST['password']
                        superuser = False

                        user = auth.authenticate(username=username, password=password)

                        if user is not None:
                                    if user.is_superuser:
                                                superuser = True
                                    auth.login(request, user)
                                    return redirect("/dashboard")
                        else:
                                    messages.info(request, "invalid credentials")
                                    return redirect("/")
            else:
                        if request.user.is_authenticated:
                                    return redirect("/dashboard")
                        else:
                                    return render(request, 'authentication/login.html')