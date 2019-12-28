import Redirect from "../src/components/animation/Redirect";
import {NextSeo} from "next-seo";
import {useState, useEffect} from "react";
import notify from "../src/components/utility/Notify";

/**
 * Check provided input - reset account password if valid.
 * @param {any} props
 * @return {void} checks validity of input provided.
 */
function ResetPassword(props: any) {
  const {query} = props;
  const {user, token, email, action} = query;
  const url = 'api/authenticate/reset';
  const [confirmation, setConfirmation] = useState(undefined);

  useEffect(() => {
    console.log(action);
    if (user && token && email && confirmation === undefined) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...query,
          action: "verify",
        }),
      })
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              notify({
                message: response.message,
                status: 'success',
                pos: 'top-left',
                timeout: 5000,
              });
            } else {
              notify({
                message: response.message,
                status: 'danger',
                pos: 'top-left',
                timeout: 5000,
              });
            }

            setConfirmation(response.status);
          })
          .catch((error) => {
            notify({
              message: error.message,
              status: 'danger',
              pos: 'top-left',
              timeout: 5000,
            });
          });
    }
  }, []);

  // only render page if user, token found in query
  if (props.query.hasOwnProperty('user') && props.query.hasOwnProperty('token')) {
    return (
      <main>
        <section>
          <div className="uk-container" >
            {confirmation &&
          (<div>
           reset password form
            {/* // TODO: Create a form and function to handle submission of a new password since we're verified */}
          </div>)
            }
            {!confirmation &&
        <div>
          <NextSeo
            title="Confirm your account."
          />
          <section id="unauthorized" className="uk-padding">
            <img src="/images/illustrations/forbidden.gif" alt="access not granted" />
          </section>
        </div>
            }
          </div>
        </section>
      </main>
    );
  } else {
    setTimeout(()=> {
      if (document) {
        document.location.href = "/authenticate";
      }
    }, 2500);
    return (
      <Redirect/>
    );
  }
}

ResetPassword.getInitialProps = ({query}: any) => {
  return {query};
};

export default ResetPassword;
