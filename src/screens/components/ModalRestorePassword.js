import React, { useEffect, useState } from "react";
import { View } from 'react-native';
import { Button, Dialog, Portal } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { ButtonMyIntelli, InputField } from ".";
import { actions } from "../../store";
import { alertOK, errorHandler } from "../../settings/utils";

const ModalRestorePassword = ({authUserRecovery, email, setEmail, visible, onHideModal}) => {
  
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false)
  const [erroremailRestore, setErroremailRestore] = useState('')

  useEffect(() => {
    if(erroremailRestore) setErroremailRestore(!erroremailRestore)
  }, [email])

  const submit = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.trim() == '') {
      setErroremailRestore(t('Login.placeholderEmail'));
      return false;
    }
    else if (!reg.test(email)) {
      setErroremailRestore(t('FormErrors.if116'));
      return false;
    }else{
      setLoading(true);
      const response = await authUserRecovery({email})
      if(response) onHideModal();
      setLoading(false);
    }
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onHideModal}>
        <Dialog.Title>{t("Common.restorePassword")}</Dialog.Title>
        <View style={{paddingHorizontal: 22, overflow: 'hidden'}}>
          <InputField
            label={t("Login.email")}
            keyboardType={"email-address"}
            value={email}
            onChange={(value) => setEmail(value)}
            error={erroremailRestore}
          />
        </View>
        <Dialog.Actions>
          <ButtonMyIntelli
            style={{ marginBottom: 4, marginRight: 8 }}
            title={t("Common.restore")}
            onPress={() => submit()}
            />
          <ButtonMyIntelli
            style={{ marginBottom: 4, marginRight: 14 }}
            title={t("Common.close")}
            onPress={onHideModal}
            />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const mapDispatchToProps = dispatch => ({
  authUserRecovery: (value) => 
    dispatch(actions.myintelliapi.authUserRecovery(value)),
});

export default connect(null, mapDispatchToProps)(ModalRestorePassword);
