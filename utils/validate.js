export default {
     validateTask  (title, description)  {
        const titleRegexp = /^[a-zA-Z0-9 ]{3,50}$/;
        const descriptionRegexp = /^[a-zA-Z0-9 ]{5,200}$/;

        if (!title || !description) {
            return false;
        }

        return !(!titleRegexp.test(title) || !descriptionRegexp.test(description));


    }

};