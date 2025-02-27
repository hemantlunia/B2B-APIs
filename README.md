CommanPart od userApi : http://localhost:8080/user/v1/userApi

1.) register type POST
 /register    data=> {"userName":"ten","email":"ten@gmail.com","mobileNo":"1234567890","password":"123456","userRole":"Admin"}

 2.) login type POST
/login    data=>{"email":"ten@gmail.com",","password":"123456"}

3.) update type PUT
/update/:userId     data=>{"oldPassword":"123456"}   userId=67b9ac0dec50538d8764a639    "for reference"  use Authorization token in update api => Authorization = Bearer YOUR-TOKEN-VALUE

4.) allUsers type GET
/alluser
**********************************************************************************************************8

commanPArt of districtApi : http://localhost:8080/user/v1/districtApi

1.) add-District type POST
/add-district     data=>{"districtName":"Jhunjhunu"}

2.) add-beat type POST
/:districtId/add-beat     data=>{"beatName":"Bus-Depo"}      

3.) updateBeat type PUT
/:districtNameId/update-beat/:beatNameId      data=>{"beatName":"Nehru-Park"}

4.) deleteBeat type DELETE 
/:districtNameId/delete-beat/:beatNameId      

5.) all-District type GET
/get-all-district      



Get all districts
reference IDs
districtId = districtNameId = 67bc2209a99199939d0f064c
beatNameId=67bc22e5a99199939d0f0655
{
  "statusCode": 200,
  "data": {
    "_id": "67bc2209a99199939d0f064c",                 
    "districtName": "Jaipur",
    "state": "",
    "country": "India",
    "beat": [
      {
        "beatName": "SindhiCamp",
        "area": "",
        "_id": "67bc22e5a99199939d0f0655"     
      },
      {
        "beatName": "World-Trade-Park(WTP)",
        "area": "",
        "_id": "67bc2346a99199939d0f065e"
      }
    ],
    "createdAt": "2025-02-24T07:38:49.207Z",
    "updatedAt": "2025-02-24T13:19:55.079Z",
    "__v": 4
  },
  "message": "Beat Deleted...",
  "success": true
}





