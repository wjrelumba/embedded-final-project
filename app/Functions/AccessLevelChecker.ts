const checkAccessLevel = () => {
        const sessionString:any | string = sessionStorage.getItem('user');
        const session:any = JSON.parse(sessionString);

        console.log(sessionString);
        console.log(session);
        return(session.access_level);
    };

export default checkAccessLevel;