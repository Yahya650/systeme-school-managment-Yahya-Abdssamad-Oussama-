import { AxiosClient } from "../Api/AxiosClient";
import { useContextApi } from "../Context/ContextApi";

export async function getTeachers() {
    const { setTeachers } = useContextApi()

    try {
        const { data } = await AxiosClient.get('/super-admin/teachers')
        setTeachers(data);
    } catch (error) {
        console.log(error);
    }
}

export async function updateTeacher(id, data) {
    try {
        AxiosClient.post('/super-admin/teachers/' + id, data)
        getTeachers()
    } catch (error) {
        console.log(error);
    }
}

export async function removeTeacher(id) {
    try {
        AxiosClient.delete('/super-admin/teachers/' + id)
        getTeachers()
    } catch (error) {
        console.log(error);
    }
}

export async function createTeacher(data) {
    try {
        AxiosClient.post('/super-admin/teachers', data)
        getTeachers()
    } catch (error) {
        console.log(error);
    }
}
export default CRUD_Teachers
