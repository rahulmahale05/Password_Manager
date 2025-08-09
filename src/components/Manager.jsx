import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeClosed, Copy } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [eye, seteye] = useState(true);
  const [showpass, setShowpass] = useState(false);
  const ref = useRef();
  const pass = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  useEffect(() => {
    getPassword();
  }, []);

  const setPassword = async (data) => {
    let a = await fetch("http://localhost:3000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    console.log(res);
  };

  const getPassword = async () => {
    let a = await fetch("http://localhost:3000");
    let data = await a.json();
    setpasswordArray(data);
  };

  const delPassword = async (userid) => {
    await fetch(`http://localhost:3000/${userid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const showPassword = () => {
    seteye(!eye);
    if (eye) {
      ref.current.type = "text";
    } else {
      ref.current.type = "password";
    }
  };
  const handleChange = (e) => {
    setform({ ...form, userid: uuidv4(), [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, form]);
      setPassword(form);
      setform({ site: "", username: "", password: "" });
      toast("Password Saved Successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Error: Password not saved!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    console.log(c);
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.userid !== id));
      delPassword(id);
    }
    toast("Password Deleted Successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((item) => item.userid == id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.userid != id));
    delPassword(id);
  };

  const copyText = (text) => {
    toast("Copid to Clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const show = () => {
    setShowpass(!showpass);
    if (showpass) {
      pass.current.className = "hidden";
    } else {
      pass.current.className = "";
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="bg-cyan-500">
        <div className="mx-auto max-w-5xl rounded-lg px-[3%] py-[1%] min-h-[82.9vh]">
          <div className="logo font-bold text-2xl text-center">
            &lt;Pass<span className="text-green-500">Op/&gt;</span>
          </div>
          <p className="text-green-800 text-lg text-center">
            Your Own Password Manager
          </p>
          <div className="flex flex-col p-4">
            <input
              value={form.site}
              name="site"
              onChange={handleChange}
              placeholder="Enter Website URL"
              className="rounded-lg border border-green-700 text-black px-[1%] py-[1px]"
              type="text"
            />
            <div className="flex my-3  gap-3 md:flex-row flex-col">
              <input
                value={form.username}
                name="username"
                onChange={handleChange}
                placeholder="Enter Username"
                className="rounded-lg border md:w-[70%] w-full border-green-700 text-black px-[1%] py-[1px]"
                type="text"
              />
              <div className="rounded-lg border md:w-[30%] w-full border-green-700 text-black relative bg-white">
                <input
                  ref={ref}
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="rounded-lg w-full text-black px-[3%] py-[1px]"
                  type="password"
                />
                <span className="absolute right-1">
                  <span className="cursor-pointer" onClick={showPassword}>
                    {eye ? <EyeClosed /> : <Eye />}
                  </span>
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex overflow-auto mx-[38%] justify-center items-center bg-green-500 hover:bg-green-600 rounded-full p-[2px] w-[22%] gap-2 border border-green-900"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save Password
            </button>
          </div>
          <div className="passwords">
            <h1
              className="text -center font-bold m-2 text-2xl cursor-pointer hover:text-blue-700"
              onClick={show}
            >
              Show Passwords
            </h1>
            <div ref={pass} className="hidden">
              {passwordArray.length === 0 ? (
                <div className="text-center py-[5%] text-xl text-red-700 font-semibold">
                  No Passwords to Show{" "}
                </div>
              ) : (
                <div className="w-auto overflow-x-auto">
                  <table className="table-auto w-full rounded-lg overflow-hidden min-w-[600px]">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-1 border text-sm sm:text-base">Website</th>
                        <th className="p-1 border text-sm sm:text-base">Username</th>
                        <th className="p-1 border text-sm sm:text-base">Password</th>
                        <th className="p-1 border text-sm sm:text-base">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-blue-300">
                      {passwordArray.map((item) => {
                        return (
                          <tr key={item.userid}>
                            <td className="border border-white">
                              <div className="flex justify-center gap-2 sm:gap-[5%] py-1 flex-wrap">
                                <a
                                  href={item.site}
                                  target="_blank"
                                  className="truncate max-w-[120px] sm:max-w-none"
                                >
                                  {item.site}
                                </a>
                                <span
                                  onClick={() => copyText(item.site)}
                                  className="cursor-pointer"
                                >
                                  <Copy width={20} className="hover:w-[110%]" />
                                </span>
                              </div>
                            </td>
                            <td className="border border-white">
                              <div className="flex justify-center gap-2 sm:gap-[5%] py-1 flex-wrap">
                                {item.username}
                                <span
                                  onClick={() => copyText(item.username)}
                                  className="cursor-pointer"
                                >
                                  <Copy width={20} className="hover:w-[110%]" />
                                </span>
                              </div>
                            </td>
                            <td className="border border-white">
                              <div className="flex justify-center gap-2 sm:gap-[5%] py-1 flex-wrap">
                                {item.password}
                                <span
                                  onClick={() => copyText(item.password)}
                                  className="cursor-pointer"
                                >
                                  <Copy width={20} className="hover:w-[110%]" />
                                </span>
                              </div>
                            </td>
                            <td className="border border-white">
                              <div className="flex justify-evenly">
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    editPassword(item.userid);
                                  }}
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                    trigger="hover"
                                    style={{ width: "25px", height: "25px" }}
                                  ></lord-icon>
                                </span>
                                <span
                                  className="cursor-pointer mx-1"
                                  onClick={() => {
                                    deletePassword(item.userid);
                                  }}
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    style={{ width: "25px", height: "25px" }}
                                  ></lord-icon>
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
