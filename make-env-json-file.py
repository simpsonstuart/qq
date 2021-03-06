#!/usr/bin/env python3

import os
import json

environmentVariables = {
    'API_URI': os.getenv('API_URI', ''),
    'PLATFORM': os.getenv('PLATFORM', ''),
    'ENVIRONMENT': os.getenv('ENVIRONMENT', ''),
    'OAUTH_URI': os.getenv('OAUTH_URI', '')
}

string = json.dumps(environmentVariables)
f = open('.env.json', 'w')
f.write(string)
f.close()

print('Created .env.json file')
