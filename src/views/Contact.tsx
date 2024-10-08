import React, { useState } from 'react';
import ReactLoading from 'react-loading';

import Header from '../components/Header';
import ViewWrapper from '../components/ViewWrapper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // @ts-ignore

const Contact = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
    const [isNotSentSuccessfully, setIsNotSentSuccessfully] = useState(false);

    const handleSendEmail = () => {
        setIsSending(true);

        const data = {
            senderEmail: email,
            subject,
            message,
        };

        fetch(
            'https://us-central1-enochspevivo-portfolio.cloudfunctions.net/nodemailerApi/send-email',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setIsSending(false);
                setIsSentSuccessfully(true);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsSending(false);
                setIsNotSentSuccessfully(true);
            });
    };

    const renderContactForm = () => {
        if (!isSentSuccessfully && !isNotSentSuccessfully) {
            return (
                <div className="relative flex flex-col gap-y-4">
                    <div
                        className={`${
                            isSending
                                ? 'flex items-center justify-center absolute z-10 top-0 left-0 w-full h-full bg-black/75'
                                : 'hidden'
                        }`}
                    >
                        <ReactLoading type={'spin'} height={75} width={75} />
                    </div>

                    <div
                        className="animate__animated animate__fadeInUp flex flex-col gap-y-1"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <label htmlFor="email" className="block text-sm font-medium">
                            your email address
                        </label>

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark: dark:"
                            placeholder="mr-robot@fsociety.com"
                            required
                        />
                    </div>

                    <div
                        className="animate__animated animate__fadeInUp flex flex-col gap-y-1"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <label htmlFor="subject" className="block text-sm font-medium">
                            subject header
                        </label>

                        <input
                            onChange={(e) => setSubject(e.target.value)}
                            type="subject"
                            id="subject"
                            className="bg-gray-700 border border-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark: dark:"
                            placeholder="hello extremely!"
                            required
                        />
                    </div>

                    <div
                        className="animate__animated animate__fadeInUp flex flex-col gap-y-1"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <label htmlFor="message" className="block text-sm font-medium">
                            your message
                        </label>

                        <div className="text-[8px] mt-[-4px] md:text-[10px]">
                            keep it clean, you.
                        </div>

                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            id="message"
                            rows="4"
                            className="block min-h-[175px] p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:min-h-[300px]"
                            placeholder="i think perhaps the most important problem is that we are trying to understand the fundamental workings of the universe via a language devised for telling one another where the best fruit is..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="animate__animated animate__fadeInUp bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={handleSendEmail}
                        style={{ animationDelay: '0.8s' }}
                    >
                        Submit
                    </button>
                </div>
            );
        } else if (isSentSuccessfully) {
            return (
                <div className="animate__animated animate__fadeInDown flex flex-col gap-y-2 justify-center items-center md:gap-y-4">
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-[48px] text-[#66ff33] md:text-[82px]"
                    />

                    <p className="text-[16px] text-center md:text-[24px]">
                        your message has been sent successfully!
                    </p>
                </div>
            );
        } else if (isSentSuccessfully) {
            return (
                <div className="animate__animated animate__fadeInDown flex flex-col gap-y-2 justify-center items-center md:gap-y-4">
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-[48px] text-[#ff3300] md:text-[82px]"
                    />

                    <p className="text-[16px] text-center md:text-[24px]">
                        there was an error sending your message. please refresh the page and try
                        again.
                    </p>
                </div>
            );
        }
    };

    return (
        <ViewWrapper viewName="work">
            <Header viewTitle={'contact'} subtitle={`reach out some time, won't you?`} />

            <div className="flex flex-col relative">
                <div className="flex flex-col gap-y-4 mb-[35px]">
                    {renderContactForm()}

                    <span
                        className="animate__animated animate__fadeInUp text-[12px] md:text-[16px]"
                        style={{ animationDelay: '1.0s' }}
                    >
                        you can always email me directly at{' '}
                        <a
                            href="mailto:gabriel@enochspevivo.com"
                            className="transition-all text-[#00e6e6] hover:text-[#93e5e5]"
                        >
                            gabriel@enochspevivo.com
                        </a>
                    </span>

                    <span
                        className="animate__animated animate__fadeInUp text-[12px] md:text-[16px]"
                        style={{ animationDelay: '1.2s' }}
                    >
                        you can also shoot me a message on{' '}
                        <a
                            href="https://www.linkedin.com/in/gabriel-g-927b51ab/"
                            target="_blank" rel="noopener noreferrer"
                            className="transition-all text-[#00e6e6] hover:text-[#93e5e5]"
                        >
                            linkedin
                        </a>
                        . i check it frequently, it's just as good as an email.
                    </span>
                </div>
            </div>
        </ViewWrapper>
    );
};

export default Contact;
