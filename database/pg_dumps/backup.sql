PGDMP  &                     }            buang.in    16.4    16.4 8    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    90825    buang.in    DATABASE     �   CREATE DATABASE "buang.in" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "buang.in";
                postgres    false                        3079    91169    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                   false            �           0    0    EXTENSION postgis    COMMENT     ^   COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';
                        false    3                        3079    90826 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    90838 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    90837    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    218            �           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    217            �            1259    91099    pickup_requests    TABLE     �  CREATE TABLE public.pickup_requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    address character varying NOT NULL,
    img_url character varying NOT NULL,
    status character varying NOT NULL,
    phone_number character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    trash_bank_id uuid NOT NULL,
    pickup_location public.geometry(Point,4326) NOT NULL,
    weight integer NOT NULL,
    length integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    pickup_start_time timestamp with time zone NOT NULL,
    pickup_end_time timestamp with time zone NOT NULL,
    sub_district_id uuid NOT NULL
);
 #   DROP TABLE public.pickup_requests;
       public         heap    postgres    false    2    3    3    3    3    3    3    3    3            �            1259    91093    pickup_requests_trash_types    TABLE     �   CREATE TABLE public.pickup_requests_trash_types (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    pickup_request_id uuid NOT NULL,
    trash_type_id uuid NOT NULL
);
 /   DROP TABLE public.pickup_requests_trash_types;
       public         heap    postgres    false    2            �            1259    92692    point_exchange_requests    TABLE     �  CREATE TABLE public.point_exchange_requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    total_points integer NOT NULL,
    transfer_method character varying NOT NULL,
    account_number character varying NOT NULL,
    bank_name character varying,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL
);
 +   DROP TABLE public.point_exchange_requests;
       public         heap    postgres    false    2            �            1259    92678    sub_districts    TABLE     �   CREATE TABLE public.sub_districts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);
 !   DROP TABLE public.sub_districts;
       public         heap    postgres    false    2            �            1259    91114    trash_details    TABLE     
  CREATE TABLE public.trash_details (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    pickup_request_id uuid NOT NULL,
    points integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    photo_url character varying NOT NULL
);
 !   DROP TABLE public.trash_details;
       public         heap    postgres    false    2            �            1259    91121    trash_details_trash_types    TABLE     �   CREATE TABLE public.trash_details_trash_types (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trash_detail_id uuid NOT NULL,
    trash_type_id uuid NOT NULL,
    weight numeric(10,2) DEFAULT '0'::numeric NOT NULL
);
 -   DROP TABLE public.trash_details_trash_types;
       public         heap    postgres    false    2            �            1259    91085    trash_types    TABLE     t   CREATE TABLE public.trash_types (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.trash_types;
       public         heap    postgres    false    2            �            1259    91071    users    TABLE     �  CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    avatar_url character varying,
    gender character varying,
    birthday timestamp without time zone,
    phone_number character varying,
    address character varying,
    points integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    location public.geometry(Point,4326)
);
    DROP TABLE public.users;
       public         heap    postgres    false    2    3    3    3    3    3    3    3    3            �            1259    91108    users_pickup_requests    TABLE     �   CREATE TABLE public.users_pickup_requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    pickup_request_id uuid NOT NULL,
    trash_bank_id uuid NOT NULL
);
 )   DROP TABLE public.users_pickup_requests;
       public         heap    postgres    false    2            �           2604    90841    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �          0    90838 
   migrations 
   TABLE DATA           ;   COPY public.migrations (id, "timestamp", name) FROM stdin;
    public          postgres    false    218   4P       �          0    91099    pickup_requests 
   TABLE DATA           �   COPY public.pickup_requests (id, name, address, img_url, status, phone_number, created_at, user_id, trash_bank_id, pickup_location, weight, length, width, height, pickup_start_time, pickup_end_time, sub_district_id) FROM stdin;
    public          postgres    false    222   �P       �          0    91093    pickup_requests_trash_types 
   TABLE DATA           [   COPY public.pickup_requests_trash_types (id, pickup_request_id, trash_type_id) FROM stdin;
    public          postgres    false    221   �Q       �          0    92692    point_exchange_requests 
   TABLE DATA           �   COPY public.point_exchange_requests (id, total_points, transfer_method, account_number, bank_name, status, created_at, user_id) FROM stdin;
    public          postgres    false    232   5R       �          0    91491    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public          postgres    false    227   RR       �          0    92678    sub_districts 
   TABLE DATA           1   COPY public.sub_districts (id, name) FROM stdin;
    public          postgres    false    231   oR       �          0    91114    trash_details 
   TABLE DATA           ]   COPY public.trash_details (id, pickup_request_id, points, created_at, photo_url) FROM stdin;
    public          postgres    false    224   �U       �          0    91121    trash_details_trash_types 
   TABLE DATA           _   COPY public.trash_details_trash_types (id, trash_detail_id, trash_type_id, weight) FROM stdin;
    public          postgres    false    225   �U       �          0    91085    trash_types 
   TABLE DATA           /   COPY public.trash_types (id, name) FROM stdin;
    public          postgres    false    220   �U       �          0    91071    users 
   TABLE DATA           �   COPY public.users (id, username, email, password, role, avatar_url, gender, birthday, phone_number, address, points, created_at, updated_at, location) FROM stdin;
    public          postgres    false    219   �V       �          0    91108    users_pickup_requests 
   TABLE DATA           ^   COPY public.users_pickup_requests (id, user_id, pickup_request_id, trash_bank_id) FROM stdin;
    public          postgres    false    223   i       �           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 4, true);
          public          postgres    false    217                       2606    91120 ,   trash_details PK_0727dd73d442101ccbd5246654d 
   CONSTRAINT     l   ALTER TABLE ONLY public.trash_details
    ADD CONSTRAINT "PK_0727dd73d442101ccbd5246654d" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.trash_details DROP CONSTRAINT "PK_0727dd73d442101ccbd5246654d";
       public            postgres    false    224                       2606    92701 6   point_exchange_requests PK_1475d2e9bbd67f57201e7408b19 
   CONSTRAINT     v   ALTER TABLE ONLY public.point_exchange_requests
    ADD CONSTRAINT "PK_1475d2e9bbd67f57201e7408b19" PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.point_exchange_requests DROP CONSTRAINT "PK_1475d2e9bbd67f57201e7408b19";
       public            postgres    false    232                       2606    91113 4   users_pickup_requests PK_18eed1155e4c4bce2a51b489372 
   CONSTRAINT     t   ALTER TABLE ONLY public.users_pickup_requests
    ADD CONSTRAINT "PK_18eed1155e4c4bce2a51b489372" PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.users_pickup_requests DROP CONSTRAINT "PK_18eed1155e4c4bce2a51b489372";
       public            postgres    false    223                       2606    92685 ,   sub_districts PK_43c23ac384b89ea8d0a9fe9fd39 
   CONSTRAINT     l   ALTER TABLE ONLY public.sub_districts
    ADD CONSTRAINT "PK_43c23ac384b89ea8d0a9fe9fd39" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.sub_districts DROP CONSTRAINT "PK_43c23ac384b89ea8d0a9fe9fd39";
       public            postgres    false    231                       2606    91098 :   pickup_requests_trash_types PK_48355e785407ace153294c2627f 
   CONSTRAINT     z   ALTER TABLE ONLY public.pickup_requests_trash_types
    ADD CONSTRAINT "PK_48355e785407ace153294c2627f" PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.pickup_requests_trash_types DROP CONSTRAINT "PK_48355e785407ace153294c2627f";
       public            postgres    false    221                       2606    91107 .   pickup_requests PK_4a347837d7b9ff0c32e41951a6a 
   CONSTRAINT     n   ALTER TABLE ONLY public.pickup_requests
    ADD CONSTRAINT "PK_4a347837d7b9ff0c32e41951a6a" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.pickup_requests DROP CONSTRAINT "PK_4a347837d7b9ff0c32e41951a6a";
       public            postgres    false    222                        2606    91092 *   trash_types PK_4f540b1792accc6cfe45d9cb63a 
   CONSTRAINT     j   ALTER TABLE ONLY public.trash_types
    ADD CONSTRAINT "PK_4f540b1792accc6cfe45d9cb63a" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.trash_types DROP CONSTRAINT "PK_4f540b1792accc6cfe45d9cb63a";
       public            postgres    false    220            �           2606    90845 )   migrations PK_8c82d7f526340ab734260ea46be 
   CONSTRAINT     i   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
       public            postgres    false    218            �           2606    91082 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public            postgres    false    219            
           2606    91128 8   trash_details_trash_types PK_d5dc39c0be7f4bc1d7b57495088 
   CONSTRAINT     x   ALTER TABLE ONLY public.trash_details_trash_types
    ADD CONSTRAINT "PK_d5dc39c0be7f4bc1d7b57495088" PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.trash_details_trash_types DROP CONSTRAINT "PK_d5dc39c0be7f4bc1d7b57495088";
       public            postgres    false    225            �           2606    91084 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public            postgres    false    219                       2606    92686 .   pickup_requests FK_11c7b6cc3a47906fc1b48e580eb    FK CONSTRAINT     �   ALTER TABLE ONLY public.pickup_requests
    ADD CONSTRAINT "FK_11c7b6cc3a47906fc1b48e580eb" FOREIGN KEY (sub_district_id) REFERENCES public.sub_districts(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.pickup_requests DROP CONSTRAINT "FK_11c7b6cc3a47906fc1b48e580eb";
       public          postgres    false    231    5646    222                       2606    91144 4   users_pickup_requests FK_1c45e003491b7358886b6ae6dfa    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_pickup_requests
    ADD CONSTRAINT "FK_1c45e003491b7358886b6ae6dfa" FOREIGN KEY (pickup_request_id) REFERENCES public.pickup_requests(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.users_pickup_requests DROP CONSTRAINT "FK_1c45e003491b7358886b6ae6dfa";
       public          postgres    false    223    5636    222                       2606    91164 8   trash_details_trash_types FK_30a97781fcd7af59126d577b3fe    FK CONSTRAINT     �   ALTER TABLE ONLY public.trash_details_trash_types
    ADD CONSTRAINT "FK_30a97781fcd7af59126d577b3fe" FOREIGN KEY (trash_type_id) REFERENCES public.trash_types(id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.trash_details_trash_types DROP CONSTRAINT "FK_30a97781fcd7af59126d577b3fe";
       public          postgres    false    225    5632    220                       2606    91149 4   users_pickup_requests FK_48811ff09e38c81eca8e1b3518b    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_pickup_requests
    ADD CONSTRAINT "FK_48811ff09e38c81eca8e1b3518b" FOREIGN KEY (trash_bank_id) REFERENCES public.users(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.users_pickup_requests DROP CONSTRAINT "FK_48811ff09e38c81eca8e1b3518b";
       public          postgres    false    5628    219    223                       2606    92707 6   point_exchange_requests FK_4e8bbd5b422ba441aa3cd150082    FK CONSTRAINT     �   ALTER TABLE ONLY public.point_exchange_requests
    ADD CONSTRAINT "FK_4e8bbd5b422ba441aa3cd150082" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.point_exchange_requests DROP CONSTRAINT "FK_4e8bbd5b422ba441aa3cd150082";
       public          postgres    false    232    219    5628                       2606    91139 4   users_pickup_requests FK_5418f08f01dc85f0a1a39429713    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_pickup_requests
    ADD CONSTRAINT "FK_5418f08f01dc85f0a1a39429713" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.users_pickup_requests DROP CONSTRAINT "FK_5418f08f01dc85f0a1a39429713";
       public          postgres    false    219    5628    223                       2606    91154 ,   trash_details FK_9348ab1a5e9fd0f769fed8d83c5    FK CONSTRAINT     �   ALTER TABLE ONLY public.trash_details
    ADD CONSTRAINT "FK_9348ab1a5e9fd0f769fed8d83c5" FOREIGN KEY (pickup_request_id) REFERENCES public.pickup_requests(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.trash_details DROP CONSTRAINT "FK_9348ab1a5e9fd0f769fed8d83c5";
       public          postgres    false    222    5636    224                       2606    92261 .   pickup_requests FK_b0f78e443dc15b65ccfa326650b    FK CONSTRAINT     �   ALTER TABLE ONLY public.pickup_requests
    ADD CONSTRAINT "FK_b0f78e443dc15b65ccfa326650b" FOREIGN KEY (trash_bank_id) REFERENCES public.users(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.pickup_requests DROP CONSTRAINT "FK_b0f78e443dc15b65ccfa326650b";
       public          postgres    false    222    219    5628                       2606    91159 8   trash_details_trash_types FK_cca048076d28ef8be0375bfd86f    FK CONSTRAINT     �   ALTER TABLE ONLY public.trash_details_trash_types
    ADD CONSTRAINT "FK_cca048076d28ef8be0375bfd86f" FOREIGN KEY (trash_detail_id) REFERENCES public.trash_details(id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.trash_details_trash_types DROP CONSTRAINT "FK_cca048076d28ef8be0375bfd86f";
       public          postgres    false    225    224    5640                       2606    91129 :   pickup_requests_trash_types FK_fa1d589f2a6cff6fc4c768869b6    FK CONSTRAINT     �   ALTER TABLE ONLY public.pickup_requests_trash_types
    ADD CONSTRAINT "FK_fa1d589f2a6cff6fc4c768869b6" FOREIGN KEY (pickup_request_id) REFERENCES public.pickup_requests(id) ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.pickup_requests_trash_types DROP CONSTRAINT "FK_fa1d589f2a6cff6fc4c768869b6";
       public          postgres    false    221    5636    222                       2606    92256 .   pickup_requests FK_fd8f85ace1f8b7f68b5ac42b0a4    FK CONSTRAINT     �   ALTER TABLE ONLY public.pickup_requests
    ADD CONSTRAINT "FK_fd8f85ace1f8b7f68b5ac42b0a4" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.pickup_requests DROP CONSTRAINT "FK_fd8f85ace1f8b7f68b5ac42b0a4";
       public          postgres    false    222    219    5628                       2606    91134 :   pickup_requests_trash_types FK_ff257f7b2d3bcaea081a3abb4cc    FK CONSTRAINT     �   ALTER TABLE ONLY public.pickup_requests_trash_types
    ADD CONSTRAINT "FK_ff257f7b2d3bcaea081a3abb4cc" FOREIGN KEY (trash_type_id) REFERENCES public.trash_types(id) ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.pickup_requests_trash_types DROP CONSTRAINT "FK_ff257f7b2d3bcaea081a3abb4cc";
       public          postgres    false    221    220    5632            �   ?   x�3�4471336261000����,	N-)-@�2*35 
YZ�s�eV�$�q��qqq �]X      �   
  x�]��n�0�g�)�LI��l���g�"�r���A��_�Z���x?܄TF�� d�N
ֲ�TU�m~���^.�2����q]��|:�c������ S4�h�A��$c^�ݎ��.��r�Ď�1���1&`YQ�p�D^ǘP�	-Ȁ�j*��@al�I�Nd�=4uGb�J�<AIE ��P��2����"�>}��K���v1�^��v�s$>�a��4(.���&�_|c��ɹ�\aR]j��4(�q�[E����O͘[      �   �   x����!@�c/�J/���	�r��2/�S������Y h�Z��4�MaYS�i�h�]v�CE����E�����a1ț��.Úcn&^AUx1����4'�U��v&��6_�	8_�f1v���>w|?c�xc8�      �      x������ � �      �      x������ � �      �   4  x�5Tˎ�6<K_�?��d���0�|ɥ�lN�3#�;0��S2���Ԭ��w��T�l�J�Z��%QojY��ٶ���޽Sר����L�'�2[u\���W��u��,#tZ:%�[4S����]�˧7�ݏ�)�{f�f�Ro�4V�)�{)���M�ao��,�["'ED:��Ei=�!:���e����N'�q%h�C�w6J�N�Y��4)��˫���e[K��(��9ܠ��Aj\�y�,��a�������dEA�zG��D�e?[��g��m;�e��;ugJ87B�8)�V�48m{�T.��;'�z���m���{�Q[�����_�����N3�Q*���z�����fY>?��=��3w��D8�2�5P�cj�̽���n ����^U<�4&%��:��FgM�fN~��Z��*"R+$L�H{*�y�\�Oay���1��-~B��f�Ё$ O<K���/���~�a��a=���^R��ad�=�<����Co$��ml2|aoF-�$c���X�DJ.���WWF���	�8nĆ?D#�A,|�|�����!��{un�&`gj$o�{	��#͈
Bx��ߞ���Ǿ2�Įdr�7)'����/_�f*������~�WZlu
E7�������Ǥ5��������j���d��M���j�!/�����>��(�(^�@e:
f��!�˳|<�C�Rzrĥ!��I��Y/�V�GE�����%���'�]��ḧޢ-��E������5X��G
i:�CQD>Kk���?p���d{G=2���L�	��a��ꌳ���7=�����o��%�_      �      x������ � �      �      x������ � �      �   �   x��I�BA �u�]��!k��=@orlQ�A�T]ty�N��L�8���S�w~n�iT1�ӢZ@�j	�)�9]��\,p6E �8���u�6=����\�ڳC89��"ݰ�W���t�٥ˈe`��J�{�"}��YzM��?��O���'=�      �      x��Y��8�=WE��]-�z��ț�W*e0�B�{�_������L&I���`��JI*�Q����7̑o1��ߒ�2*ξ�ٲ���i�������5�/?Gs1�p����Q?w���࿬�#����?�g`��,��86���#�7&EA�g-���
�H^�u�Q�d�����/?����~������X�.�e����7��_!�7���	���H�� t���<�#���0L<�`,
�(�,Er�B��a$���J �J�����o��qB�I��_���ucT~]�9��+�Q�G�_ꢪ�O`��:bE�zq֤4fs������Ȓ����J`��f�/�M��>�,�Q+m�������5}�|}V]������Z��3ɯ_��ڪ~�s���W%:������8A�_�ǿA�W��~��_)
�Q�o�������0��;��` �Q0�?�GcD0���Q��H�[��7$�1�!�ȿS���~s7�L����wҩ��3|����P��3ܚ���9|�7��X��L���e[��K��oUP�Y�_q�d8�@� JӖӄ�]�m����Ns |�<M7"sS4�}�E�rv`r֡q��
6��X��J'�<9kQ��TN2W_ઽ\Ĩ\���H��X�Q'[w�C�뤕.�?��� �fx�V,z�4F.h��x��$�鄦oq
��!��%�v9��%��ю��]f�%����軌���E�#0��Kr/2�(��m��,��(��Αl����E�z���x� �f��z�0�%�ZD4}|�-�f�I�}�f�oӮ*,�HCu�[K���H߃�K��7d�x�R�vب�7������1i+�Y��gW�*)WX���i
�$�syP�"��p�|K��b�2�G��٨x
�/���Mx��!Z�ek�����,��	
��8Ʃޅ�[�BvHz3Hog�M [-}2� �Uk�]Jr��+��ȞD�=ncv���q��$}�<(�/
<��T ���2g� b��%�LZj��8�D�e�q�Kh���!��T�x,4�k�U�[�?��A9���B︐��I�A�rN7���^����_L��L��Q���d�L�]�>�O�]�bzFK[�݅u��@�H6�H��bF}XD�rDv*-���HO
Z&�����{!�%7��K�̐����2�E�:&�z+��)t�Z���r>���� ��M�����x�Σ�'�K��u���ٰ���2�4G��J�%,�7S�i� ��>b/���R����چW�^h.@�̓Ӎڐa.�t�н�S/��T�poάe�Ҭ�4����0�q��Z�O�G���k��	q�oTxiu
'I��;���)���L��	5K\��\��}������ٓo��#�TA=ڮ!gT�k�ʙ&���jzc,��6jqEK�i�����^�PfTe\����=3�M��u�u����F.+ޓЍ�PL�ΫȰ��$�55I��XZ2��-/.�$��x��5jW>l����/�%ʷ���o9l0�22Lڔq�P#��v�(c(�
[�JUֶ� �&�߰����w���|Jt`�j�� ��u����8��A�=�,��[�2;�b�XNm�7Y/sf�����"��;�ѿ{:ǹ�<y�OP!�'�)��O?�U�ӮLi�W�Ԑ@�W�K��T���u�zG�Z�u	���=���`J�Ok�C�GW8"Z.{�F���m��螔�J]�ymd�D�6hɴ�u ��D��>';�5C��&��Ns(�Q�X�2PI�aҦYD��&��O.���f�-�&��x���^�\&��]�m��䞩[��5���|<��biC^�i��$Nj��5��A��^jEQ���������lh �
�a�A<02r�h��#��#`�@D�6�m���z�T
�kO���ym�&Wi�����>�<��Y��p�O*�X7m����BKܫ���j�������b&bC�aT[tU�xuM�(oS"�c���>SB���o�Qd�!��N/�	� g�6?D���Ѧ�ms���=�����{�I��X	���|�&�!�� ���5VIS���:�r^_GiuS�۱�*��dhl%j������&��A��rƛ]#+ I73(.���!?o}ȳg��)͈)�A�8��ꑯ4�&2�-��V�4I����C;���r�!jA�0P=N�ۚ�[)i������\��asY�5٘�-���I
���;}ؓ������s���Ԋ�VUc�3[x��
�׻	�jG�Z�\�eWFy#��*�U��K�#6]X��tO6+n�`��C�L�+=Ν2m�"�zt<�H�񘥎ȏ��u�J�Ф�=��<� �NAK��png�e]7���!�YJx�q�W�dZ`�`��U��h���Wal��GNݧe���>�:׈�%hf2�4�I���N�e����	�K���1�B�}X�Xdlac��y���AT�*��s=�v�ڵ<6���}� 	���3��n˫��_�܇'��&{�6y�ő�o�c��y�מ��Z���ɻ�x���\g�S���8!�n�hKk iӭDT䦖�~[fh�y��^��0K�k��p�i©������C��󤍆O?B��[�_�
�5��2`E����8H���4vʅ��)�RHBϯ����m1�8Y>D��_�'���i>�͙*]�ڇ��S1%��ܞ��#� U}:PbҀ��qB�}����uMa��6�cY;%��V_	��Mr��Y{Z_��ys`�C���I}v�1��F��Q��!��M),�x�KC\FsIbb(�V5�'k�����ð���$S�W�='m.tQ[O���MmX��2*	}:Z2|��˺��[�t4��A%�1
@;�F-��	�8i3�q�~:�Ij��&I�$z/���h��ṝU��||H"?����Fb�a�+�K��SZ(�qXV-��ZG�+�MRܳem\P�d]�Β�Vr��S���S�]VO}��QŢ���J NPwǮ�M򯍘�v�NE?c��El
�����g�9M7!�Pi�z�G���O�w��p\x����e��2��+.03�
a}�(��޹����t2���g�հo�Y����Ʌ!y���(U���Ǯ{��HN��U`�����Í�$���N��ul�ۛJÒܾ1p���*�tU�b�g�"�l������/Eb=�H�����\7�K!�3�Q'x���Y(o-X��Q�l�D��9�j���q��OB�k�|v=�Lx�M��7a���xJ%X�귛�?P�����䖴*�9��N��6oC.P�Zi���
�(�Y��:X����P�	�ڬ>�D�?�wZqDϥ�qm��G�Ԛ*��g�1˜f,M3��ȁ4F�)Jy1�aO�68�1��0����M�x���Y��TlX�,���˜#��)�;��z�|l��znm"ce��QV�O��`�vǲ@����Խ�5Rl��$�tm:D!�I�>�ʠ+����\&%��:n��p�L~ʴ�X��U��]83�䆷��)���7URO�P{�I�3ә��<�tv�k��!W��s�1�f
'�[����2�J,km���5�ڢl�����Y�W�j�G��*���.�*�*�㝓�jj�͈1����>�pA�����錚_-
+��@���Ǯӓ�#��>�ol؉���;�B���-e܍p85�����<g+Fe�n����Zl:%���|#��0)�:!l���ՐKG��]o_�3X��;�*(��C6+�@�8%�a�X�/ %D��}��L�|d�h������'+S%�/G�S.GS^��/�Xq��z���땰4"kz��p��`�Pjo�*f$T�8���Hw�q�D+�C��ݼ�HڗL�	���ۇ_}	1n�4���f�`���itHL໳��e��T����E�Gr�FXQ��^	݃�N�kMSc䕠*����w�7j�@�'�������.��qU@����r�<m�0f�������6�rbL��+Z繳���$0;$������� ^  ����_��O0Vײ�z��U]���d�Xu�q�>�9�3�8�O�Ns��+:��"���B�9��I=�0&��F'�7�WHz.�+����6"s}5��%�g�����Yn�ц��3E4�7�Qm��Ai��7�C�OuI���Yz8=_��2�W��U@u%QNa�'���yx��މ����!k�`�}'���1d�ɉ��nwX?���r�|�x��0&3�6Gg7������u/�e���9S z��rp<�u��������f�LT��A�ctp��
��(r>�����f����0���m��b�w
�l�c~��Q��nJ�� $J*{��tKW��S���T���Q�t���1�tm�z������!!>�\j���F܊�ۑ@q`Y5چ���Oҕ��V�n�.�*Յk��������'�N���8�dz{ �;6��c�g�:���AL������'�?r��D�����#j���X�+�g���?�	�U3Nm�ݱ��A���4*aC�n#�i��f��Ӹ�o��a0(�,s��6C�џ ����_ڨ��}����4�}��~������?�-P?����Jb����/����?���� ��?{      �      x������ � �     