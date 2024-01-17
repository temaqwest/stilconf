import React, { FC, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './BottomConference.module.scss'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import AppButton, {
    ButtonSize,
    ButtonTheme
} from '@/shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import AppSideBar from '@/shared/ui/AppSideBar/AppSideBar'
import { Chat } from '@/entities/Chat'
import ChatInput from '@/features/ChatInput/ui/ChatInput'
import { useTheme } from '@/app/providers/ThemeProvider'
import { User, UserContainer } from '@/entities/User'
import { UserSpeed } from '@/entities/User/api/types'

interface BottomConferenceProps {
    className?: string
    localAudioState: boolean
    localVideoState: boolean
    onAudioToggle: () => void
    onVideoToggle: () => void
}

const usersMockData: User[] = [
    {
        username: 'Farren',
        id: 0,
        userId: '659b58e7dd37a22908c7d970',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Quinn',
        id: 0,
        userId: '659b58e7028884a03984ada2',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Addison',
        id: 0,
        userId: '659b58e754429e647e095c2e',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Parker',
        id: 0,
        userId: '659b58e710db0807a1667033',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Asra',
        id: 0,
        userId: '659b58e7d78900fd1cfad3da',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Jody',
        id: 0,
        userId: '659b58e7db340bea15892bde',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Tracy',
        id: 0,
        userId: '659b58e77e267887deaf4f67',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Duffy',
        id: 0,
        userId: '659b58e7bea4a8c93f8f5ac8',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Jody',
        id: 0,
        userId: '659b58e71c545625b9d40796',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Jo',
        id: 0,
        userId: '659b58e7470a2cac0d507627',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Jean',
        id: 0,
        userId: '659b58e7f1f5dfd62913643b',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Charity',
        id: 0,
        userId: '659b58e7974ac9e1a2444c9e',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Mildred',
        id: 0,
        userId: '659b58e7aafee42a90ef9e87',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Jean',
        id: 0,
        userId: '659b58e76777932e999395b4',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    },
    {
        username: 'Rowan',
        id: 0,
        userId: '659b58e7d4d56c1130502cff',
        speed: UserSpeed.KB100,
        createdAt: 'tod'
    }
]

const mockData = {
    chatId: 'string',
    content: [
        {
            userId: 'string',
            username: 'Artem',
            content:
                'Veniam enim inceptos, augue, iure vehicula nascetur gravida at exercitation urna ullamcorper accusantium quo itaque tincidunt, aliquet! Vero repudiandae nostrum commodi, fermentum veritatis quisquam habitasse facere voluptates repudiandae nullam ridiculus natus per platea! Taciti maecenas hymenaeos! Nonummy adipisci quod cumque sapien architecto sociis posuere mollitia mattis? Curabitur fugiat mi incidunt egestas occaecati dolorum.',
            date: '2023-12-21T22:55:55.079Z'
        },
        {
            userId: 'string',
            username: 'Artem',
            content:
                'Proident iaculis doloremque dolorum, montes natoque enim integer facilis aliquip. Aliquam magni. Nulla, quae, quia consectetur mollitia senectus, nullam turpis! Do sem, voluptas nihil, ex. Eligendi ullam tristique. Aperiam minus, ullam sunt eos nullam suspendisse amet aspernatur neque. Consequuntur eleifend, vel perferendis sit integer! Sodales ex aliquid venenatis nostrum risus labore.',
            date: '2023-12-21T22:57:55.079Z'
        },
        {
            userId: 'string',
            username: 'Artem',
            content:
                'Blandit risus laborum voluptates voluptatum hendrerit reiciendis, aliqua a elementum platea libero aute, ullamcorper eaque occaecati molestie fuga! Nulla posuere justo lacus, fermentum placeat quidem sociosqu aliquid, tempus quibusdam hac! Tincidunt voluptas quibusdam quos aliquid exercitationem. Porro explicabo proin, aliquet laboriosam quas, proident labore. Ullamco, donec ut hic orci. Reprehenderit.',
            date: '2023-12-21T22:59:58.079Z'
        }
    ],
    createdAt: '2023-12-21T21:32:05.079Z',
    registeredUsers: 'asdsad'
}

const BottomConference: FC<BottomConferenceProps> = ({
    className,
    children,
    onVideoToggle,
    onAudioToggle,
    localAudioState,
    localVideoState
}) => {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const [chatSidebar, setChatSidebar] = useState(false)
    const [usersSidebar, setUsersSidebar] = useState(false)
    const [messageValue, setMessageValue] = useState('')

    function sendMessage(value: string) {
        console.log({ value })
        setMessageValue(value)
        mockData.content = [
            ...mockData.content,
            {
                userId: 'string',
                username: 'You',
                content: value,
                date: new Date().toISOString()
            }
        ]
    }

    return (
        <div className={classNames(cls?.BottomConference, {}, [className])}>
            <AppButton
                title={t('microphone')}
                className={classNames(cls.Microphone, {
                    [cls.TurnedOff]: !localAudioState
                })}
                size={ButtonSize.LARGE}
                theme={ButtonTheme.FAB}
                onClick={onAudioToggle}
            >
                <AppIcon name={'microphone'} className={cls.Icon} />
            </AppButton>
            <AppButton
                title={t('camera')}
                className={classNames(cls.Camera, {
                    [cls.TurnedOff]: !localVideoState
                })}
                size={ButtonSize.LARGE}
                theme={ButtonTheme.FAB}
                onClick={onVideoToggle}
            >
                <AppIcon name={'camera'} className={cls.Icon} />
            </AppButton>
            <div className={cls.Divider} />
            <AppButton
                title={t('shareDisplay')}
                className={cls.Button}
                size={ButtonSize.LARGE}
                theme={ButtonTheme.FAB}
            >
                <AppIcon name={'shareDisplay'} className={cls.Icon} />
            </AppButton>
            <div className={cls.Divider}></div>
            <AppButton
                title={t('openChat')}
                id='openChat'
                onClick={setChatSidebar.bind(null, !chatSidebar)}
                className={cls.Button}
                size={ButtonSize.LARGE}
                theme={ButtonTheme.FAB}
            >
                <AppIcon name={'chat'} className={cls.Icon} />
            </AppButton>
            <AppButton
                title={t('showUsers')}
                id='showUsers'
                onClick={setUsersSidebar.bind(null, !usersSidebar)}
                className={cls.Button}
                size={ButtonSize.LARGE}
                theme={ButtonTheme.FAB}
            >
                <AppIcon name={'users'} className={cls.Icon} />
            </AppButton>
            <AppButton
                theme={ButtonTheme.SECONDARY}
                className={cls.EndCall}
                size={ButtonSize.LARGE}
            >
                {t('endCall')}
            </AppButton>
            <AppSideBar
                show={chatSidebar}
                title={t('chat')}
                activatorId='openChat'
                onToggle={(flag) =>
                    setChatSidebar.bind(
                        null,
                        flag !== undefined ? flag : !chatSidebar
                    )()
                }
            >
                <Chat
                    chatData={mockData}
                    actionSlot={
                        <ChatInput
                            theme={theme}
                            value={messageValue}
                            sendMessage={sendMessage}
                        />
                    }
                />
            </AppSideBar>
            <AppSideBar
                show={usersSidebar}
                title={t('users')}
                activatorId='showUsers'
                onToggle={(flag) =>
                    setUsersSidebar.bind(
                        null,
                        flag !== undefined ? flag : !usersSidebar
                    )()
                }
            >
                <UserContainer users={usersMockData} />
            </AppSideBar>
        </div>
    )
}

export default BottomConference
