from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

import subprocess

from django.core.files.storage import default_storage
# Create your views here.

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
input_url = os.path.join(BASE_DIR,"input.txt")

@csrf_exempt
def SaveFile(request):
    file=request.FILES['uploadedFile']
    file_name = default_storage.save(file.name,file)
    f = open(input_url, "w")

    f.write(file_name)
    f.close()

    cmd = "python C:/Users/User/Desktop/System_Django/DjangoAPI/final.py"
    p1 = subprocess.Popen(cmd, shell= True, stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    out,err = p1.communicate()
    print('out:{0}'.format(out))
    if (p1.returncode==0):
        list = []

        f = open("C:/Users/User/Desktop/System_Django/DjangoAPI/output.txt",'r')
        for line in f:
            s = "/"
            flag = False
            for i in line:
                if (i=='i'):
                    flag = True
                
                if (flag):
                    if (i=='\\'):
                        i = '/'
                    if (s[len(s)-1]=='/' and i=='/'):
                        continue
                    s+= i
            s = s[1:len(s)-1]
            list.append(s)
    
    return JsonResponse(list,safe=False)