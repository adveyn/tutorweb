'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

Token hashing
'''
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six 

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return(six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_active))

account_activation_token = AccountActivationTokenGenerator()