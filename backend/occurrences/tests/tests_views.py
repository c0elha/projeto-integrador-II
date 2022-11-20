from django.test import TestCase, Client
from occurrences.models import Occurrences, Categories
from users.models import User

class CategoriesViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        Categories.objects.create(
            name='Alagamento',
            color='blue')

    def test_categories_list(self):
        response = self.client.get('/api/occurrences-categories/') 
        self.assertEquals(response.status_code, 200) 
        self.assertJSONEqual( str(response.content, encoding='utf8'), 
        [{'id': 1, 'name': 'Alagamento', 'description': None, 'color': 'blue'}])

class OccurrencesViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        user = User.objects.create(
            first_name='Geovana',
            last_name='Corrêa',
            username='geovanacorrea',
            password='Test@2006280'
        )

        category = Categories.objects.create(
            name='Alagamento',
            color='blue'
        )

        Occurrences.objects.create(
            user=user,
            category=category,
            title='Alagamento ao lado do Rio',
            description='Sempre que aconte uma chuva forte acontece alagamento',
            latitude='-21.6762266',
            longitude='-49.7459022',
        )

    def test_view_create_occurrences_list(self):
        response = self.client.get('/api/occurrences/') 
        self.assertEquals(response.status_code, 200)       