// here we are checking token for route, like that we can use this token any-ware like service calls etc.

login post 

POST:  http://localhost:9000/api/login

response : 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiaGFyaXNoIiwiZW1haWwiOiJoYXJpc2gua2F0dGFzQGdtYWlsLmNvbSJ9LCJpYXQiOjE1NTY3MTI1Mjl9.6hoMrlXrNzFqUYbET1Q0rco2xg4L-ih2fySrkKNGRfg"
}




POSt:  http://localhost:9000/api/post

headers:  
key: Authorization    
value: Bearer iwiZW1haWwiOiJoYXJpc2gua2F0dGFzQGdtYWlsLmNvbSJ9LCJpYXQiOjE1NTY3MTE5Nzd9.HN3wGws5vXytjQZM

response: 

{
    "msg": "message posted",
    "authData": {
        "user": {
            "id": 1,
            "name": "harish",
            "email": "harish.kattas@gmail.com"
        },
        "iat": 1556711977
    }
}