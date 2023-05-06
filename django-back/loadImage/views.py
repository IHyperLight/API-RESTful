from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import exceptions
import os.path
import json

from loadImage.serializers import ImageSerializer

from loadImage.models import ImageModel

# Create your views here.


class ImageView(APIView):

    def response_custom(self, message, pay_load, status):
        response_dictionary = {
            'message': message,
            'pay_load': pay_load,
            'status': status
        }
        response_string = json.dumps(response_dictionary)
        response_json = json.loads(response_string)
        return response_json

    def post(self, request):
        if 'url_img' not in request.data:
            raise exceptions.ParseError("Selecciona el archivo a subir")

        file = request.data['url_img']
        file_name, file_format = os.path.splitext(file.name)
        request.data['name_img'] = file_name
        request.data['format_img'] = file_format
        serializer = ImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            response = self.response_custom(
                "Success", serializer.data, status=status.HTTP_201_CREATED)
            return Response(response)
        response = self.response_custom(
            "Error", serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(response)

    def get(self, request, format=None):
        queryset = ImageModel.objects.all()
        serializer = ImageSerializer(
            queryset, many=True, context={'request': request})
        response = self.response_custom(
            "Success", serializer.data, status=status.HTTP_200_OK)
        return Response(response)


class ImagenViewDetail(APIView):

    def response_custom(self, msg, response, status):
        response_dictionary = {
            "messages": msg,
            "pay_load": response,
            "status": status,
        }
        response_string = json.dumps(response_dictionary)
        response_json = json.loads(response_string)
        return response_json

    def get_object(self, pk):
        try:
            return ImageModel.objects.get(pk=pk)
        except ImageModel.DoesNotExist:
            return 0

    def get(self, request, pk, format=None):
        id_response = self.get_object(pk)
        if id_response != 0:
            id_response = ImageSerializer(id_response)
            response = self.response_custom(
                "Success", id_response.data, status=status.HTTP_200_OK)
            return Response(response)
        response = self.response_custom(
            "Error", "No hay datos", status=status.HTTP_200_OK)
        return Response(response)

    def put(self, request, pk, format=None):
        id_response = self.get_object(pk)
        file = request.data['url_img']
        file_name, file_format = os.path.splitext(file.name)
        request.data['name_img'] = file_name
        request.data['format_img'] = file_format
        serializer = ImageSerializer(id_response, data=request.data)
        if serializer.is_valid():
            id_response.url_img.delete(save=True)
            serializer.save()
            datas = serializer.data
            response = self.response_custom(
                "Success", datas, status=status.HTTP_201_CREATED)
            return Response(response)
        response = self.response_custom(
            "Error", serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(response)

    def delete(self, request, pk, format=None):
        id_response = self.get_object(pk)
        if id_response != 0:
            id_response.url_img.delete(save=True)
            id_response.delete()
            response = self.response_custom(
                "Success", "Eliminado", status=status.HTTP_200_OK)
            return Response(response)
        response = self.response_custom(
            "Error", "No se pudo eliminar", status=status.HTTP_400_BAD_REQUEST)
        return Response(response)
