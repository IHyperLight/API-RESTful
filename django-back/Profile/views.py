from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import exceptions
import os.path

# import of models
from Profile.models import ProfileModels

# import of serializers
from Profile.serializers import ProfileSerializers

# Create your views here.


class ProfileView(APIView):

    def get_object(self, id_user):
        try:
            return User.objects.get(pk=id_user)
        except User.DoesNotExist:
            return 0

    def post(self, request):
        if 'url_img' not in request.data:
            raise exceptions.ParseError("Selecciona el archivo a subir")
        id_user = request.data['id_user']
        user = self.get_object(id_user)
        if user != 0:
            serializers = ProfileSerializers(data=request.data)
            if serializers.is_valid():
                validated_data = serializers.validated_data
                profile = ProfileModels(**validated_data)
                profile.save()
                serializers_response = ProfileSerializers(profile)
                return Response(serializers_response.data, status=status.HTTP_201_CREATED)
            else:
                return Response("put_img")
        else:
            return Response("No existe el usuario", status=status.HTTP_404_NOT_FOUND)


class ProfileViewDetail(APIView):

    def get_object(self, pk):
        try:
            return ProfileModels.objects.get(id_user=pk)
        except ProfileModels.DoesNotExist:
            return 0

    def get(self, request, pk, format=None):
        id_response = self.get_object(pk)
        if id_response != 0:
            id_response = ProfileSerializers(id_response)
            return Response(id_response.data, status=status.HTTP_200_OK)
        else:
            return Response("Usuario sin imagen subida")

    def put(self, request, pk, format=None):
        url_img = request.data['url_img']
        id_response = self.get_object(pk)
        if(id_response != 0):
            try:
                os.remove('assets/'+str(id_response.url_img))
            except os.error:
                print("No existe la imagen")
            id_response.url_img = url_img
            id_response.save()
            return Response("Actualizado", status=status.HTTP_201_CREATED)
        else:
            return Response("No se pudo actualizar", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        profile = self.get_object(pk)
        if profile != 0:
            profile.url_img.delete(save=True)
            return Response("Eliminado", status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("No se pudo eliminar", status=status.HTTP_400_BAD_REQUEST)


class ProfileUser (APIView):

    def response_custom(self, user, status):
        response = {
            "username": user[0]['username'],
            "email": user[0]['email'],
            "first_name": user[0]['first_name'],
            "last_name": user[0]['last_name'],
            "status": status,
        }
        return response

    def get(self, request, pk, format=None):
        user = User.objects.filter(pk=pk)
        if user != 0:
            response = self.response_custom(
                user.values(), status=status.HTTP_200_OK)
            return Response(response)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk, format=None):
        user = User.objects.filter(pk=pk)
        if user != 0:
            user.update(username=request.data.get('username'))
            user.update(email=request.data.get('email'))
            user.update(first_name=request.data.get('first_name'))
            user.update(last_name=request.data.get('last_name'))
            response = self.response_custom(
                user.values(), status=status.HTTP_200_OK)
            return Response(response)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
