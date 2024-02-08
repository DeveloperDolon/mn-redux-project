import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase/firebase.config";
import { useCreateContactMutation } from "@/redux/features/contact/contact";
import { CgAttachment } from "react-icons/cg";

const ContactFrom = () => {
  const [createContact] = useCreateContactMutation();
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const storage = getStorage(app);

  const onSubmit = formData => {
    setShowModal(true);
    const uploadPromises = Array.from(formData.image).map(imageFile => {
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(getStorage(app), fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          error => {
            console.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(imageUrl => {
                resolve({ title: imageFile?.name, image: imageUrl });
              })
              .catch(error => {
                console.error("Error getting download URL:", error);
                reject(error);
              });
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then(results => {
        const imageURLs = results.map(result => ({
          title: result.title,
          image: result.image,
        }));

        const contactData = {
          name: formData?.name,
          email: formData?.email,
          mediaLink: formData?.website,
          message: formData?.message,
          exampleData: imageURLs,
        };
        createContact(contactData);
        console.log("Contact created successfully:", contactData);
      })
      .catch(error => {
        console.error("Error occurred during form submission:", error);
      });
  };

  const handleLinkIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = e => {
    const files = e.target.files;
    console.log("Selected files:", files);
  };

  return (
    <div>
      <Card className="w-full">
        <CardContent className="space-y-2 bg-[#FFEFEF]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-4 flex flex-col gap-4"
          >
            <div>
              <Input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className="rounded-none"
                placeholder="Name"
              />
            </div>
            <div>
              <Input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="rounded-none"
                placeholder="Email"
              />
            </div>
            <div>
              <Input
                type="text"
                id="website"
                {...register("website", { required: true })}
                className="rounded-none"
                placeholder="Website/Facebook"
              />
            </div>
            <div className="flex items-center">
              <div className="w-full relative flex justify-end">
                <Input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  type="file"
                  multiple
                  className="rounded-none"
                  placeholder="Example Design Image"
                  {...register("image", { required: true })}
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                <label htmlFor="image" className="absolute mt-3 mr-4">
                  <CgAttachment
                    className="text-black font-bold"
                    onClick={handleLinkIconClick}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Textarea
                type="text"
                id="message"
                {...register("message", { required: true })}
                placeholder="Message"
                className="resize-none rounded-none"
              />
            </div>
            <div className="flex justify-center px-4 mt-1">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-1/4 rounded-none bg-blue-500 hover:bg-blue-600 font-medium"
              >
                SUBMIT
              </Button>
            </div>
          </form>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="bg-white rounded-lg p-8 z-50">
                <h2 className="text-2xl font-bold mb-4">
                  Contact Submitted Successfully
                </h2>
                <p>Your contact form has been submitted successfully.</p>
                <button
                  onClick={handleCloseModal}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactFrom;
