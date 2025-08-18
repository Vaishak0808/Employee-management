from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomForm,SubmittedDetail

class CustomFormAPIView(APIView):
    def post(self,request):
        try:
            if not request.data.get('form_name') or request.data.get('form_name').strip() =='':
                raise Exception('Form Name cannot be empty')
            if not request.data.get('fields') or len(request.data.get('fields')) == 0:
                raise Exception('Please provide fields')
            CustomForm.objects.create(
                form_name = request.data.get('form_name'),
                fields = request.data.get('fields')
            )
            return Response({'status':1})
        except Exception as e :
            return Response({'status':0,'message':str(e)})
    def get(self,request):
        try:
            ins_forms = CustomForm.objects.values()
            return Response({'status':1,'data':ins_forms})

        except Exception as e:
            return Response({'status':0,'message':str(e)})

class SaveFormDetails(APIView):
    def post(self,request):
        try:
            SubmittedDetail.objects.create(
                fk_form_id = request.data.get('formid'),
                json_details = request.data.get('formDetails'),
                fk_created = request.user

            )
            return Response({'status':1})
        except Exception as e :
            return Response({'status':0,'message':str(e)})
    def get(self,request):
        try:
            ins_form_details =  SubmittedDetail.objects.values('fk_form__form_name','dat_created__date','fk_created__first_name','fk_created__last_name','json_details')
            return Response({'status':1,'data':ins_form_details})
        except Exception as e :
            return Response({'status':0,'message':str(e)})