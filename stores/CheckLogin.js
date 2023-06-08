import Axios from "./Axios";


export function AdminCheckLogin(setIsLoading, router, href) {
  Axios.get("admin/checklogin")
    .then((res) => {
    setIsLoading(!res.data)
      if (res.data == false){
        router(href)
      }
    })
    .catch((err) => {
    console.log("Admin Logged: ", err)
    setIsLoading(true)
      if (err.response==undefined){
        setTimeout(() => AdminCheckLogin(setIsLoading, router, href), 5000);
      }
    });
}
export function TeacherCheckLogin(setIsLoading, router, href) {
  Axios.get("teacher/checklogin")
  .then((res) => {
    setIsLoading(!res.data)
    if (res.data == false){
      router(href)
    }
  })
  .catch((err) => {
    console.log("Teacher Logged: ", err)
    setIsLoading(true)
    if (err.response==undefined){
      setTimeout(() => TeacherCheckLogin(setIsLoading, router, href), 5000);
    }
  });
}

