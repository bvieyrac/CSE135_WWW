from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# Dashboard
def dashboard(request):
            if request.user.is_authenticated:
                        return render(request, "dashboard/dashboard.html", {"name": "Dashboard"})
            else:
                        return render(request, "authentication/login_prompt.html")

# Metric Name (Detailed Report)
def metricname(request):
            if request.user.is_authenticated:
                        return render(request, "dashboard/metricname.html", {"name": "Metricname"})
            else:
                        return render(request, "authentication/login_prompt.html")