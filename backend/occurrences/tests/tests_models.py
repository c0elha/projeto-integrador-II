from django.test import TestCase

from occurrences.models import Occurrences, Categories
from users.models import User

class CategoriesTestCase(TestCase):
    def setUp(self):
        Categories.objects.create(
            name='Alagamento',
            color='blue')

    def test_create_category_none(self):
        categoryFind = Categories.objects.get(name='Alagamento')
        self.assertIsNotNone(categoryFind)

    def test_create_category_str(self):
       categoryFind = Categories.objects.get(name='Alagamento')
       self.assertEquals(categoryFind.name, 'Alagamento')

class OccurrencesTestCase(TestCase):
    def setUp(self):
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
    
    def test_create_occurrences_stc(self):
        occurrenceFind = Occurrences.objects.get(title='Alagamento ao lado do Rio')
        self.assertEquals(occurrenceFind.title, 'Alagamento ao lado do Rio')

    def test_occurrences_has_category_stc(self):
        categoryFind = Categories.objects.get(name='Alagamento')
        occurrenceFind = Occurrences.objects.get(title='Alagamento ao lado do Rio')
        self.assertEquals(categoryFind, occurrenceFind.category)

    def test_occurrences_has_user_stc(self):
        userFind = User.objects.get(username='geovanacorrea')
        occurrenceFind = Occurrences.objects.get(title='Alagamento ao lado do Rio')
        self.assertEquals(userFind, occurrenceFind.user)

    def test_occurrences_has_status_stc(self):
        occurrenceFind = Occurrences.objects.get(title='Alagamento ao lado do Rio')
        self.assertEquals(occurrenceFind.status, 'NOT_COMPLETED')    

