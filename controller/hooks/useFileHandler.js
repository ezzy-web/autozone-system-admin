import { useState } from 'react'

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../app/config/client.config'


const useFileHandler = () => {

    const [fileURL, setFileURL] = useState()
    const [progress, setProgress] = useState(0)
    const [task, setTask] = useState()
    const [uploadState, setUploadState] = useState({
        uploading: false,
        paused: false,
        isCancelled: false,
        isComplete: false
    })


    const deleteFile = (url) => {
        const storageRef = ref(storage, url)
        deleteObject(storageRef)
    }


    const uploadFile = (file, path) => {
        const storageRef = ref(storage, path)
        const task = uploadBytesResumable(storageRef, file)

        task.on("state_changed", snap => {
            const progress = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(progress)

            switch (snap.state) {
                case "paused":
                    setUploadState({ ...uploadState, paused: true })
                    break

                case "running":
                    setUploadState({ ...uploadState, paused: false, uploading: true })
                    break;

                default:
                    break
            }
        },

            error => {
                setUploadState({ ...uploadState, paused: false, uploading: false, isCancelled: true })
                console.log(error)
            },

            () => {
                setUploadState({ ...uploadState, isComplete: true })
                getDownloadURL(task.snapshot.ref).then(url => {
                    setFileURL(url)
                })
            }


        )
        setTask(task)
    }


    const handleResume = () => {
        if (task) task.resume()
    }

    const handlePause = () => {
        if (task) task.pause()
    }


    const handleCancel = () => {
        if (task) task.cancel()
    }




    return { deleteFile, uploadFile, task, handleCancel, handlePause, handleResume, state: uploadState, fileURL, progress }
}



export default useFileHandler