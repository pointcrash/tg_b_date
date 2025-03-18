import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder

TOKEN = "7886681164:AAGTfTQiSYv4G4Y65rllvaz0mWm8escBrrQ"
WEB_APP = "https://330f-109-245-96-219.ngrok-free.app"

bot = Bot(token=TOKEN)
dp = Dispatcher()


@dp.message(Command(commands=["start"]))
async def start_command(message: types.Message):
    keyboard_builder = InlineKeyboardBuilder()
    keyboard_builder.button(
        text="Открыть WebApp",
        web_app=WebAppInfo(url=WEB_APP),
    )

    await message.answer(
        "Нажмите кнопку ниже, чтобы открыть WebApp!",
        reply_markup=keyboard_builder.as_markup(),
    )


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
