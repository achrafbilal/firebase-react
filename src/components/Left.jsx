
import { Drawer } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { database } from '../hooks/useAuth'
import ServersList from './ServersList'

function Left({ open, setLeftOpen, setServer, user }) {

    const [servers, setServers] = useState([])
    useEffect(() => {
        database
            .collection('servers')
            .orderBy('name', 'asc')
            .onSnapshot
            (
                snap => {
                    let m = snap.docs.map(e => ({ id: e.id, ...e.data(), setServer: setServer }))
                    setServers(m)
                }
            )
    }, [])
    //
    return (
        <React.Fragment key={'left'}>
            <Drawer anchor={'left'} open={open} onClose={() => setLeftOpen(false)}>
                {user &&
                    <div className="left_menu_container" style={{ background: '#3F51B5' }}>
                        <ServersList user={user} servers={servers} />
                    </div>
                }
            </Drawer>

        </React.Fragment>
    )
}

export default Left
