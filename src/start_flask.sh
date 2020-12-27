#!/bin/bash

. ve*/bin/activate

cd project*

export FLASK_APP=$(ls | grep app)
export FLASK_ENV=development

flask run
