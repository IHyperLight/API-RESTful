from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json

# imports of aggregate models
from primerComponente.models import PrimerTabla

# serializer imports
from primerComponente.serializers import PrimerTablaSerializer

# Create your views here.


class PrimerTablaList(APIView):

    def response_custom(self, message, pay_load, status):
        response_dictionary = {
            'message': message,
            'pay_load': pay_load,
            'status': status
        }
        response_string = json.dumps(response_dictionary)
        response_json = json.loads(response_string)
        return response_json

    def get(self, request, format=None):
        queryset = PrimerTabla.objects.all()
        serializer = PrimerTablaSerializer(
            queryset, many=True, context={'request': request})
        response = self.response_custom("Success", serializer.data, 200)
        return Response(response)

    def post(self, request, format=None):
        serializer = PrimerTablaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            datas = serializer.data
            response = self.response_custom(
                "Success", datas, status=status.HTTP_201_CREATED)
            return Response(response)
        else:
            response = self.response_custom(
                "Error", serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(response)


class PrimerTablaDetail(APIView):
    def get_object(self, pk):
        try:
            return PrimerTabla.objects.get(pk=pk)
        except PrimerTabla.DoesNotExist:
            return 0

    def get(self, request, pk, format=None):
        id_response = self.get_object(pk)
        if id_response != 0:
            id_response = PrimerTablaSerializer(id_response)
            return Response(id_response.data, status=status.HTTP_200_OK)
        return Response("No hay datos", status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        id_response = self.get_object(pk)
        serializer = PrimerTablaSerializer(id_response, data=request.data)
        if serializer.is_valid():
            serializer.save()
            datas = serializer.data
            return Response(datas, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        id_response = self.get_object(pk)
        if id_response != 0:
            id_response.delete()
            return Response("Eliminado", status=status.HTTP_204_NO_CONTENT)
        return Response("No hay datos", status=status.HTTP_400_BAD_REQUEST)
