import axios from "axios";

const url = "https://onesignal.com/api/v1/notifications";


/**
 * Send webpush notification to  store.
 * @param {object} data - The parameter for sending the notification.
 * @param {string} data.title - The title of the notification.
 * @param {string} data.contents - The notification contents
 * @param {string} data.url - Url to add to web push
 * @param {Array}  data.users - Target user external ID (email address), leave empty for sending to all store.
 */
const sendToStore = async (data) => {
  let headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic MjE3MGZmYzctZGUzZC00YzMwLWJmNzMtYjFjYjU4ZDE1ZmVm"
  };

  let storeData = {
    app_id: "4d40d0fd-b176-47b0-ae6c-8adceaa86370",
    contents: { "en": data.contents },
    channel_for_external_user_ids: "push",
    include_external_user_ids: data.users,
    headings: { "en": data.headings },
    url: data.url,
  };
  const responseStore = await axios.post(url, storeData, {
    headers: headers
  });
  console.log(responseStore);
}


/**
 * Send webpush notification to  staff.
 * @param {object} data - The parameter for sending the notification.
 * @param {string} data.title - The title of the notification.
 * @param {string} data.contents - The notification contents
 * @param {string} data.url - Url to add to web push
 * @param {Array}  data.users - Target user external ID (email address), leave empty for sending to all store.
 */
const sendToStaff = async (data) => {
  let headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic MGMwOTIzOWUtOGFmNS00Y2JjLWFkMTgtNWQwYmQ3Mjc2YjNk"
  };

  let staffData = {
    app_id: "8a412da9-fcb2-4efc-a6c2-d9bf28d52576",
    contents: { "en": data.contents },
    channel_for_external_user_ids: "push",
    include_external_user_ids: data.users,
    headings: { "en": data.headings },
    url: data.url,
  };


  const responseStore = await axios.post(url, staffData, {
    headers: headers
  });
  console.log(responseStore);
};


/**
 * Send webpush notification to  dispatcher.
 * @param {object} data - The parameter for sending the notification.
 * @param {string} data.title - The title of the notification.
 * @param {string} data.contents - The notification contents
 * @param {string} data.url - Url to add to web push
 * @param {Array}  data.users - Target user external ID (email address), leave empty for sending to all store.
 */
const sendToDispatcher = async (data) => {

  let headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic Y2M1ZTlmZDYtN2ZhOC00YTFkLTk5ZjQtNGFmMjliZDYzZTRk"
  };
  let dispatcherData = {
    app_id: "53d8d975-12c6-4260-83a7-f173066a4908",
    contents: { "en": data.contents },
    channel_for_external_user_ids: "push",
    include_external_user_ids: data.users,
    headings: { "en": data.headings },
    url: data.url,

  }; 
  const responseDispatcher = await axios.post(url, dispatcherData, {
    headers: headers
  });
  console.log(responseDispatcher);
}



export { sendToStore, sendToStaff, sendToDispatcher };