# Use a Python base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy backend code into the container
COPY . .

RUN mkdir -p public/images

# Download the keys.py file from the provided Google Drive link
RUN wget --no-check-certificate 'https://drive.google.com/uc?export=download&id=1rJQXk95NmKePIZZKSF8aOdv_SvdjE3z2' -O keys.py
RUN mv keys.py api/keys.py

# Install dependencies
RUN pip install -r requirements.txt

# Expose the port Flask runs on (usually 5000)
EXPOSE 5328

# Start the Flask app
CMD ["python", "-m", "flask", "--app", "api/index", "run", "-p", "5328", "--host=0.0.0.0"]
