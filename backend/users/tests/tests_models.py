import re
from django.test import TestCase

from ..models import User

class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(
            first_name='Geovana',
            last_name='Corrêa',
            username='geovanacorrea',
            password='Test@2006280'
        )

    # Verifica se o usuario foi criado
    def test_create_user_str(self):
        userFind = User.objects.get(username='geovanacorrea')   
        
        self.assertEquals(userFind.__str__(), 'geovanacorrea')
        
    # Verifica se o username do usuario criado possui apenas letras e números
    def test_check_username_str(self):
        pattern = re.compile("^[a-zA-Z0-9]+$")
        userFind = User.objects.get(username='geovanacorrea')    
        
        self.assertIsNotNone(pattern.match(userFind.username))
    
