#!/bin/bash

. ve/bin/activate

cd app*

export FLASK_APP=$(ls | grep app)
export FLASK_ENV=development

flask run
