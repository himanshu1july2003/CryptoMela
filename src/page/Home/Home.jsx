import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import AssetTable from './AssetTable';
import Stockchart from './Stockchart';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { DotIcon, MessageCircle } from 'lucide-react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action';
import { store } from '@/State/Store';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
const Home = () => {
    const dispatch = useDispatch()
    const { coin } = useSelector(store => store)
    const [category, setCategory] = React.useState("all");
    const [inputValue, setInputValue] = React.useState("");
    const [isBotRelease, setIsBotRelease] = React.useState(false); // Corrected variable name for consistency
    const [messages, setMessages] = React.useState([ // State to hold chat messages
        {
            text: 'Hi, Himanshu\nHave any questions related to crypto?\nJust Ask it, "Mai Hoon Naa 😎"...',
            sender: 'ai' // 'ai' for bot messages, 'user' for user messages
        }
    ]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCategory = (value) => {
        setCategory(value);
    };
    useEffect(() => {
        dispatch(getCoinList(1))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTop50CoinList())
    }, [category])
    console.log(coin, "--------")
    console.log(localStorage.getItem("jwt"))
    const handleKeyPress = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            // Add user's message
            const newUserMessage = { text: inputValue, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, newUserMessage]);

            // Simulate an AI response (replace with actual AI logic later)
            const aiResponseText = `You asked: "${inputValue}". I'm processing your request...`;
            setTimeout(() => { // Simulate an API call delay
                setMessages((prevMessages) => [...prevMessages, { text: aiResponseText, sender: 'ai' }]);
            }, 1000); // 1 second delay for AI response

            setInputValue(""); // Clear the input field
        }
    };

    const handleBotRelease = () => {
        setIsBotRelease(!isBotRelease);
    };

    return (
        <div className='relative'>
            <div className='lg:flex'>
                <div className='lg:w-[50%] border-r'>
                    <div className='p-3 flex items-center gap-4'>
                        <Button
                            onClick={() => handleCategory("all")}
                            variant={category === "all" ? "default" : "outline"}
                            className="rounded-full">
                            All
                        </Button>
                        <Button
                            onClick={() => handleCategory("top50")}
                            variant={category === "top50" ? "default" : "outline"}
                            className="rounded-full">
                            Top 50
                        </Button>
                        <Button
                            onClick={() => handleCategory("topGainer")}
                            variant={category === "topGainer" ? "default" : "outline"}
                            className="rounded-full">
                            Top Gainers
                        </Button>
                        <Button
                            onClick={() => handleCategory("topLooser")}
                            variant={category === "topLooser" ? "default" : "outline"}
                            className="rounded-full">
                            Top Lossers
                        </Button>
                    </div>
                    <AssetTable coin={category == "all" ? coin.coinList : coin.top50} category={category} />

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
                <div className='hidden lg:block lg:w-[50%] p-5'>
                    <Stockchart coinId={"bitcoin"} />
                    <div className='flex gap-5 items-center'>
                        <div className='h-20 w-20'>
                            <Avatar >
                                <AvatarImage src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'></AvatarImage>
                            </Avatar>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>BTC</p>
                                <DotIcon className="text-gray-400" />
                                <p className="text-gray-400">Bitcoin</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-xl font-bold">
                                    ${coin.coinDetails?.market_data?.current_price?.usd || "112427"}
                                </p>
                                <p className="text-red-600">
                                    <span>
                                        {coin.coinDetails?.market_data?.price_change_percentage_1h_in_currency?.usd ?? -0.004}%
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
                {isBotRelease && (
                    <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-700">
                        <div className="flex justify-between items-center border-b px-6 h-[12%]">
                            <p>Chat Bot</p>
                            <Button onClick={handleBotRelease} variant="ghost" size="icon">
                                <Cross1Icon />
                            </Button>
                        </div>
                        <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
                            {/* Render all messages from the 'messages' state */}
                            {messages.map((message, i) => (
                                <div
                                    key={i}
                                    className={`pb-5 w-auto ${message.sender === 'user' ? "self-end" : "self-start"}`}
                                >
                                    <div
                                        className={`px-5 py-2 rounded-md w-auto ${message.sender === 'user' ? "bg-blue-600 text-white" : "bg-slate-800 text-gray-200"
                                            }`}
                                    >
                                        <p className="whitespace-pre-line">{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='h-[12%] border-t'>
                            <Input
                                className="w-full h-full border-0 focus:ring-0"
                                placeholder="write prompt"
                                onChange={handleChange}
                                value={inputValue}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                )}
                <div className="relative w-[10rem] cursor-pointer group flex">
                    <Button onClick={handleBotRelease} variant="" className="w-full flex h-[3rem] gap-2 items-center">
                        <MessageCircle
                            size={30}
                            className="fill-[#f1f1f1] -rotate-90 stroke-none group-hover:fill-[#0059ff]"
                        />
                        <span className="text-2xl">Chat Bot</span>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;