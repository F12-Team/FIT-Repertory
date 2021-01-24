-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: std-mysql
-- Время создания: Янв 24 2021 г., 18:42
-- Версия сервера: 5.7.26-0ubuntu0.16.04.1
-- Версия PHP: 7.4.11

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `std_1096`
--
DROP DATABASE IF EXISTS `std_1096`;
CREATE DATABASE IF NOT EXISTS `std_1096` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `std_1096`;

DELIMITER $$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `Curators`
--

DROP TABLE IF EXISTS `Curators`;
CREATE TABLE `Curators` (
  `id` bigint(20) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `middle_name` varchar(32) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Curators`
--

INSERT INTO `Curators` (`id`, `last_name`, `first_name`, `middle_name`, `description`) VALUES
(1, 'Недогарок ', 'Антон', 'Александрович', 'Куратор, преподаватель'),
(2, 'Жуплев', 'Антон', 'Сергеевич', 'Куратор, преподаватель'),
(3, 'Гневшев', 'Александр', 'Юрьевич', 'Куратор, преподаватель'),
(4, 'Толстиков', 'Антон', 'Витальевич', 'Куратор, преподаватель'),
(5, 'Харченко', 'Елена ', 'Александровна', 'Куратор, преподаватель'),
(6, 'Даньшина', 'Марина', 'Владимировна', 'Куратор, преподаватель');

-- --------------------------------------------------------

--
-- Структура таблицы `Directions`
--

DROP TABLE IF EXISTS `Directions`;
CREATE TABLE `Directions` (
  `id` bigint(20) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` tinytext,
  `order_of_direction` int(11) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Directions`
--

INSERT INTO `Directions` (`id`, `name`, `description`, `order_of_direction`, `img`) VALUES
(1, 'ИНТЕГРАЦИЯ И ПРОГРАММИРОВАНИЕ В САПР', '09.03.01', 6, 'SAPR'),
(2, 'ПРИКЛАДНАЯ КИБЕРБЕЗОПАСНОСТЬ', '10.03.01 ', 1, 'IB'),
(5, 'КОРПОРАТИВНЫЕ ИНФОРМАЦИОННЫЕ СИСТЕМЫ', '09.03.03', 5, 'KIS'),
(6, 'КИБЕРФИЗИЧЕСКИЕ СИСТЕМЫ', '09.03.01', 4, 'KIBERSYSTEM'),
(7, 'ВЕБ-ТЕХНОЛОГИИ', '09.03.01', 2, 'WEBTECH'),
(8, 'БОЛЬШИЕ И ОТКРЫТЫЕ ДАННЫЕ', '01.03.02, 09.03.03', 3, 'BIGDATA'),
(9, 'КИБЕРБЕЗОПАСНОСТЬ ВЕБ-ПРИЛОЖЕНИЙ', '10.05.03', 7, 'IBAS');

-- --------------------------------------------------------

--
-- Структура таблицы `Groups`
--

DROP TABLE IF EXISTS `Groups`;
CREATE TABLE `Groups` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `id_of_direction` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Groups`
--

INSERT INTO `Groups` (`id`, `name`, `id_of_direction`) VALUES
(1, '181-352', 2),
(2, '181-351', 2),
(3, '171-372', 5),
(4, '171-371', 5),
(5, '191-351', 2),
(6, '191-352', 2),
(12, '191-325', 1),
(13, '191-321', 1),
(14, '191-322', 1),
(15, '191-323', 1),
(16, '191-324', 1),
(17, '171-334', 1),
(18, '171-333', 1),
(19, '161-342', 1),
(20, '161-331', 9),
(21, '171-331', 7),
(22, '171-332', 7),
(23, '191-321', 7),
(24, '191-322', 7),
(25, '191-323', 7),
(26, '191-324', 7),
(27, '191-325', 7),
(28, '181-321', 7),
(29, '181-322', 7),
(30, '181-323', 7),
(31, '181-324', 7),
(32, '181-325', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `Projects`
--

DROP TABLE IF EXISTS `Projects`;
CREATE TABLE `Projects` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `id_of_semestr` bigint(20) NOT NULL,
  `id_of_curator` bigint(20) NOT NULL,
  `id_of_direction` bigint(20) NOT NULL,
  `description` text,
  `poster` text,
  `video` text,
  `likes` bigint(20) NOT NULL DEFAULT '0',
  `git` text NOT NULL,
  `site` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Projects`
--

INSERT INTO `Projects` (`id`, `name`, `id_of_semestr`, `id_of_curator`, `id_of_direction`, `description`, `poster`, `video`, `likes`, `git`, `site`) VALUES
(1, 'Система трансляции экрана ПК преподавателя, раздачи файлов \r\nи текстовых сообщений на рабочие ПК студентов\r\n', 3, 1, 2, 'Если вы учитесь на IT, то вам известна проблема, связанная с раздачей экрана преподавателя. Из-за того, что преподаватели пользуются разным ПО, студентам приходится иметь у себя на ноутбуках множество программ с одинаковым предназначением. Наша команда, как никто другой, понимает эту проблему. Поэтому мы решили взяться за этот проект, чтобы решить данную проблему в нашем вузе.', 'sistema_translyatsii.png', 'https://drive.google.com/file/d/1OxoIsp3DXvwb6h4V7QnWwQizVwE_eLWh/preview', 1, '', ''),
(2, '1С: создание пользовательских и отчетных форм, справочников', 3, 2, 5, 'В течении семестра мне поступали заявки от пользователей на доработку того или иного функционала конфигурации. Я реализовывал их запросы. В основном нужно было добавить тот или иной реквизит, преобразовать форму справочника или документа.', '1s.png', 'https://drive.google.com/file/d/1Fm7Tc9Pf8ZvT0oY9sqISP-x6wX7iOLKP/preview', 2, '', ''),
(3, 'Ricochet Robots For PC', 3, 3, 2, 'Разрабатываемый программный продукт будет использоваться преимущественно детьми и подростками, а также другими пользователями персональных компьютеров для развития навыков логического мышления и развлечения. Каждый желающий сможет опробовать данную игры в онлайн режиме. Игра Ricochet Robots актуальна и необходима для людей, желающих развить свои навыки логического мышления, а также для тех, кто хочет опробовать данную игру, но не имеет возможности приобрести её настольную версию в силу отсутствия соигроков или технических возможностей (отсутствия в продаже настольной версии игры). Поэтому данная разработка несет за собой исключительно положительный характер.\r\n', 'ricochet-1.png', 'https://drive.google.com/file/d/1-aLuxANdwkn11jK7VWAobZd8r9afhGaO/preview', 0, 'https://gitlab.com/IndiGo21/robots\r\n', 'http://robots.std-1202.ist.mospolytech.ru'),
(4, 'Аналитическая панель руководителя образовательной программы', 3, 4, 1, 'Наша основная задача разработки аналитической панели – предоставить руководителю образовательной программы удобный интерфейс для обработки информации и более быстрого взаимодействия с ней. В рамках данной работы нам необходимо было создать клиентскую часть, серверную часть и отдельный настраиваемый модуль для работы с парсером.\r\n', 'anal_panel.jpg', NULL, 0, 'https://github.com/shnurok98/pd', 'https://trello.com/b/frZdB5yG/%D0%B4%D0%B0%D1%88%D0%B1%D0%BE%D1%80%D0%B4'),
(5, 'Аутентификация пользователей по клавиатурному почерку', 3, 5, 9, 'В данной работе представлено исследование биометрического метода аутентификации с помощью машинного обучения. Так как у каждого пользователя есть определенный способ набора текста, эту информацию можно использовать для создание систем защиты.\r\n', 'nph.jpg', 'https://drive.google.com/file/d/1IqnUjE9tvZJB6kkXEiOp1riTwvbOWoAF/preview', 0, 'https://github.com/shroompie/Keystroke-Dynamics', 'http://shroomp.ru/pd/'),
(6, 'ВЕБ-ПРИЛОЖЕНИЕ ГИПП', 3, 6, 7, 'Было получено задание от ГИПП на создание такого\r\nвеб-приложения, которые будет представлять из себя тот самый частный\r\nновостной портал, непосредственно для Гильдии Издателей\r\nПериодической Печати. Веб-приложение должно иметь удобный\r\nинструментарий для создания статей непосредственно на портале и их\r\nверстке, инструментарий для редактирования самого сайта, а также\r\nотображать все актуальные новости.', 'Veb-prilozhenie_GIPP-1.png', 'https://drive.google.com/file/d/1ujnMIvjwDRsFkMulNWHtns0aCgn7hAKB/preview', 1, 'https://github.com/Eskinnikita/gipp-pd', 'http://gipp.std-272.ist.mospolytech.ru/ '),
(7, 'Веб-приложение для автоматического составления расписания для ВУЗа', 3, 3, 2, 'Задача данного проекта разработать веб-приложение, которое облегчит работу диспетчерской службы по составлению расписания. С помощью приложения можно будет автоматически генерировать расписание для всех групп сразу, что значительно ускорит процесс его составления.\r\n', 'nph.jpg', 'https://drive.google.com/file/d/10O4MUVopxM9kGtID4ewCzPI06GuO9xK4/preview', 0, '', 'http://easytable.site/#/table\r\n');

-- --------------------------------------------------------

--
-- Структура таблицы `Semesters`
--

DROP TABLE IF EXISTS `Semesters`;
CREATE TABLE `Semesters` (
  `id` bigint(20) NOT NULL,
  `year` year(4) NOT NULL,
  `autumn_or_spring` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Semesters`
--

INSERT INTO `Semesters` (`id`, `year`, `autumn_or_spring`) VALUES
(1, 2020, 'Осенний семестр 2020'),
(2, 2021, 'Весенний семестр 2021'),
(3, 2020, 'Весенний семестр 2020'),
(4, 2019, 'Осенний семестр 2019');

-- --------------------------------------------------------

--
-- Структура таблицы `Students`
--

DROP TABLE IF EXISTS `Students`;
CREATE TABLE `Students` (
  `id` bigint(20) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `middle_name` varchar(32) DEFAULT NULL,
  `id_of_group` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Students`
--

INSERT INTO `Students` (`id`, `last_name`, `first_name`, `middle_name`, `id_of_group`) VALUES
(1, ' Баранов', ' Григорий', ' Александрович', 1),
(2, 'Стебло', ' Алексей', ' Сергеевич', 1),
(3, 'Захаров', ' Василий', ' Андреевич', 1),
(4, 'Константинов', ' Денис', ' Андреевич', 1),
(5, 'Чикишев', ' Тимур', ' Васильевич', 1),
(6, 'Новикова', ' Юлия', ' Олеговна', 1),
(7, 'Новиков', 'М.', 'С.', 3),
(8, 'Пак', 'Наталья', 'Сергеевна', 5),
(9, 'Ковалев', 'Дмитрий', 'Евгеньевич', 5),
(10, 'Валикова', 'А.', 'А.', 5),
(11, 'Давыткина', 'Полина ', 'Евгеньевна', 5),
(12, 'Михайлов', 'Артем', 'Михайлович', 5),
(13, 'Ализаде', 'Ульяна', 'Витальевна', 5),
(14, 'Степаненко', 'И.', 'С.', 19),
(15, 'Буравов', 'А.', 'Н.', 19),
(16, 'Павлова', 'С.', 'О.', 17),
(17, 'Стумбин', 'Б.', 'В.', 16),
(18, 'Абрамова', 'Ю.', 'Г.', 12),
(19, 'Гостев', 'П.', 'А.', 12),
(20, 'Павленко', 'Александр', NULL, 20),
(21, 'Ескин', 'Никита', 'Алексеевич', 21),
(22, 'Голенко', 'Вадим', 'Владимирович', 21),
(23, 'Гыждиян', 'Дмитрий', 'Сергеевич', 21),
(24, 'Курмаз', 'Анастасия', 'Владиславна', 21),
(25, 'Оспанов', 'Сергей', 'Александрович', 21),
(26, 'Кожух', 'Егор', 'Константинович', 24),
(27, 'Малиновская', 'Ксения', 'Валерьевна', 28),
(28, 'Кузьменко', 'Виктория ', 'Евгеньевна', 21),
(29, 'Окунев ', 'Степан', 'Олегович', 2),
(30, 'Шиманков', 'Кирилл', 'Леонидович', 2),
(31, 'Шмаков ', 'Данила ', 'Борисович ', 2),
(32, 'Петров ', 'Антон ', 'Денисович ', 2),
(33, 'Богачёв ', 'Максим ', 'Георгиевич ', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `Teams`
--

DROP TABLE IF EXISTS `Teams`;
CREATE TABLE `Teams` (
  `id` bigint(20) NOT NULL,
  `id_of_project` bigint(20) NOT NULL,
  `id_of_student` bigint(20) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Teams`
--

INSERT INTO `Teams` (`id`, `id_of_project`, `id_of_student`, `role`) VALUES
(1, 1, 1, 'Лидер и корректировщик'),
(2, 1, 2, 'Главный разработчик flask сервера'),
(3, 1, 3, 'Главный разработчик HTML/JS'),
(4, 1, 4, 'Помощник разработчика flask сервера и QT'),
(5, 1, 6, 'Дизайнер и разработчик link_preview'),
(6, 1, 5, 'Главный разработчик клиентского приложения (QT)'),
(7, 2, 7, 'Разработчик'),
(8, 3, 8, 'Разработчик'),
(9, 3, 9, 'Разработчик'),
(10, 3, 10, 'Разработчик'),
(11, 3, 11, 'Разработчик'),
(12, 3, 12, 'Разработчик'),
(13, 3, 13, 'Разработчик'),
(14, 4, 14, 'Разработчик'),
(15, 4, 15, 'Разработчик'),
(16, 4, 16, 'Разработчик'),
(17, 4, 17, 'Разработчик'),
(18, 4, 18, 'Разработчик'),
(19, 4, 19, 'Разработчик'),
(20, 5, 20, 'Разработчик'),
(21, 6, 21, 'Подготовил Git репозиторий, составил план\r\nработы над проектом, собрал информацию, изучил,\r\nпроанализировал, сравнил и выбрал лидирующую связку\r\nплатформа-язык, подготовил документацию, разработал клиентскую\r\nчасть приложения.'),
(22, 6, 22, 'Ответственный за вспомогательный бекенд\r\nдля хранения файлов(картинки, видео, документы и т.д.) . А именно\r\nза: настройку nginx; БД PostreSQL; создание структуры БД; создание\r\nархитектуры бэкенда; создание роутинга; настройку middleware\r\nбэкенда; создание контроллеров для соединения роутинга с\r\nуправлением бд; развертывание и запуск бэкенда на сервере с\r\nиспользованием актуальных переменных окружения.'),
(23, 6, 23, 'Спроектировал систему, отвечал за\r\nсоздание бд, создание таблиц, изучение работы с токенами, создание\r\ncrud запросов для таблицы пользователей, проверку работы токенов,\r\nсоздание crud запросов для новостей.'),
(24, 6, 24, 'Работала над дизайном проекта.\r\nРазработала дизайн-макетов страницы авторизации, личного\r\nкабинета, пользовательского представления.'),
(25, 6, 25, 'Производил тестирование,заполнение\r\nдокументаций тестирования, составление документаций для проекта,подготовка видеоролика и презентации проекта.'),
(26, 6, 26, 'Помог в проектировании системы,проводил\r\nрефакторинг кода, изучение PHP и работы с токенами.'),
(27, 6, 27, 'Разработала дизайн-макетов\r\nстраницы добавления новостей, редактирования новостей.'),
(29, 6, 28, 'Составление документаций для\r\nпроекта, коммуникации с заказчиком, составление презентации для\r\nзащиты проекта.'),
(30, 7, 29, 'Составление алгоритма, документация, помощь с Frontend'),
(31, 7, 30, 'Frontend'),
(32, 7, 31, 'Составление алгоритма, документация'),
(33, 7, 32, 'Управляющий проектом, backend, алгоритмы, консультация по frontend, построение архитектуры приложения'),
(34, 7, 33, 'Backend, построение архитектуры приложения');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Curators`
--
ALTER TABLE `Curators`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Directions`
--
ALTER TABLE `Directions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `Groups`
--
ALTER TABLE `Groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Groups_fk0` (`id_of_direction`);

--
-- Индексы таблицы `Projects`
--
ALTER TABLE `Projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Projects_fk0` (`id_of_semestr`),
  ADD KEY `Projects_fk1` (`id_of_curator`),
  ADD KEY `Projects_fk2` (`id_of_direction`);

--
-- Индексы таблицы `Semesters`
--
ALTER TABLE `Semesters`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Students_fk0` (`id_of_group`);

--
-- Индексы таблицы `Teams`
--
ALTER TABLE `Teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Teams_fk0` (`id_of_project`),
  ADD KEY `Teams_fk1` (`id_of_student`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Curators`
--
ALTER TABLE `Curators`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Directions`
--
ALTER TABLE `Directions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `Groups`
--
ALTER TABLE `Groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `Projects`
--
ALTER TABLE `Projects`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `Semesters`
--
ALTER TABLE `Semesters`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Students`
--
ALTER TABLE `Students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `Teams`
--
ALTER TABLE `Teams`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

-
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Groups`
--
ALTER TABLE `Groups`
  ADD CONSTRAINT `Groups_fk0` FOREIGN KEY (`id_of_direction`) REFERENCES `Directions` (`id`);

--
-- Ограничения внешнего ключа таблицы `Projects`
--
ALTER TABLE `Projects`
  ADD CONSTRAINT `Projects_fk0` FOREIGN KEY (`id_of_semestr`) REFERENCES `Semesters` (`id`),
  ADD CONSTRAINT `Projects_fk1` FOREIGN KEY (`id_of_curator`) REFERENCES `Curators` (`id`),
  ADD CONSTRAINT `Projects_fk2` FOREIGN KEY (`id_of_direction`) REFERENCES `Directions` (`id`);

--
-- Ограничения внешнего ключа таблицы `Students`
--
ALTER TABLE `Students`
  ADD CONSTRAINT `Students_fk0` FOREIGN KEY (`id_of_group`) REFERENCES `Groups` (`id`);

--
-- Ограничения внешнего ключа таблицы `Teams`
--
ALTER TABLE `Teams`
  ADD CONSTRAINT `Teams_fk0` FOREIGN KEY (`id_of_project`) REFERENCES `Projects` (`id`),
  ADD CONSTRAINT `Teams_fk1` FOREIGN KEY (`id_of_student`) REFERENCES `Students` (`id`);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
